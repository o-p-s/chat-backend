/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const ChatModel = mongoose.model('Chat');
const UserModel=mongoose.model('User');
const ChatRoomModel=mongoose.model('ChatRoom');

let setServer = (server) => {

    let allOnlineUsers = [];
    let allActiveRooms=[];
    let io = socketio.listen(server);

    let myIo = io.of('')

    myIo.on('connection',(socket) => {

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");

        socket.on("verify-invite",(token)=>{console.log('called')
                tokenLib.verifyClaimWithoutSecret(token,(err,verifiedInfo)=>{
                    if(err){
                        socket.emit('auth-error', { status: 400, error: 'Incorrect invite token' })
                    }
                    else{
                        delete verifiedInfo.data.__v
                        delete verifiedInfo.data._id
                        socket.emit('decoded-info',{'error':false,'message':'Verified Invite','status':200,'data':verifiedInfo.data})
                    }
                })            
        })
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "verify-invite" Verify token.
         * @apiDescription Verifies a Invite Token
         * 
         * @apiParam {string} [token] invite token. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
             {
                 'error':false,
                 'message':'Verified Invite',
                 'status':200,
                 'data':verified and decoded data
            }
        */ 
        socket.on('set-user',(authToken) => {
            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken,(err,user)=>{
                if(err){
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else{
                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`);
    
                    let userObj = {userId:currentUser.userId,fullName:fullName}
                    allOnlineUsers.push(userObj)
                    console.log(allOnlineUsers)

                    socket.defaultRoom=currentUser.defaultAppRoom;
                    socket.join(socket.defaultRoom);
                    socket.emit('online-user-list',allOnlineUsers);
                    socket.to(socket.defaultRoom).broadcast.emit('online-user-list',allOnlineUsers)                               
                }
            })
          
        }) 
        // end of listening Set-user event
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {emit} "online-user-list" Online User List
         * @apiDescription Sends an online users list.
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
                {
                    fullName:"User11 L11",
                    userId:"tw-syQJJ9"
                },
                {
                    fullName:"user103 S",
                    userId:"Y_nchyDcv"
                }
            ]
        */

        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "set-user"  Set User
         * @apiDescription Verifies authenticated token, set user on online users list and emit updated list.
         * 
         * @apiParam {string} [authToken] token for verification. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
                {
                    fullName:"User11 L11",
                    userId:"tw-syQJJ9"
                },
                {
                    fullName:"user103 S",
                    userId:"Y_nchyDcv"
                }
            ]
        */ 
        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            console.log(socket.userId);

            var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex,1)

            socket.to(socket.defaultRoom).broadcast.emit('online-user-list',allOnlineUsers);
            socket.leave(socket.defaultRoom)
        }) 
        // end of on disconnect
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "disconnect" Disconnect
         * @apiDescription Disconnect the user from socket,remove the user from online list, unsubscribe the user from his own channel and emit updated list.
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
                {
                    fullName:"User11 L11",
                    userId:"tw-syQJJ9"
                },
                {
                    fullName:"user103 S",
                    userId:"Y_nchyDcv"
                }
            ]
        */ 

        socket.on('chat-msg', (data) => {
            console.log("socket chat-msg called")
            data['chatId'] = shortid.generate()
            // event to save chat.
            setTimeout(function(){
                eventEmitter.emit('save-chat', data);
            },2000)
            if(data.chatRoom)
            socket.to(data.receiverId).broadcast.emit('roomMessage',data)
            else
            myIo.emit(data.receiverId,data)
        });
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {emit} "roomMessage"  Room Message
         * @apiDescription Sends data/message to a room.
         * 
         * @apiParam {string} [senderName] sender name. (required)
         * @apiParam {string} [senderId] sender Id. (required)
         * @apiParam {string} [receiverName] receiver name. (required)
         * @apiParam {string} [receiverId] receiver Id. (required)
         * @apiParam {string} [message] message. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         *   
        */

        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "chat-msg" Chat Message
         * @apiDescription Save the chat Message, inform the room if sent in a room else sends to the receiver.
         * 
         * @apiParam {string} [senderName] sender name. (required)
         * @apiParam {string} [senderId] sender Id. (required)
         * @apiParam {string} [receiverName] receiver name. (required)
         * @apiParam {string} [receiverId] receiver Id. (required)
         * @apiParam {string} [message] message. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                chatId:"WVs4gOvNN",
                chatRoom:false,
                createdOn:"2018-07-21T20:33:05.720Z",
                message:"hey",
                modifiedOn:"2018-07-21T20:33:05.720Z",
                receiverId:"tw-syQJJ9",
                receiverName:"User11 L11"
                seen:false,
                senderId:"Y_nchyDcv",
                senderName:"user103 S"
            }
        */ 
        socket.on('user-typing', (data) => {
            if(data.req=='room')            
            socket.to(data.receiverId).broadcast.emit('typing',data);
            else if(data.req=='user')
            myIo.emit(data.receiverId,(data))
        });
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {emit} "typing" Typing
         * @apiDescription Sends the userinfo who is typing.
         * 
         * @apiParam {string} [senderName] sender name. (required)
         * @apiParam {string} [receiverId] receiver Id. (required)
         * @apiParam {string} [receiverName] receiver name. (required)
         * @apiParam {string} [req] "user". (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.   
        */

         /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "on-typing" On Typing
         * @apiDescription Receives userinfo and emit "typing" accordingly (room/user).
         * 
         * @apiParam {string} [senderName] sender name. (required)
         * @apiParam {string} [receiverId] receiver Id. (required)
         * @apiParam {string} [receiverName] receiver name. (required)
         * @apiParam {string} [req] "user". (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                receiverId:"tw-syQJJ9",
                req:"user",
                userName:"user103 S"
            }
        */
        socket.on('set-rooms',()=>{
            // joining chat-group rooms.
           let findUser=()=>{return new Promise((resolve,reject)=>{
           UserModel.findOne({'userId':socket.userId},(err,user)=>{
               if(err){
                   console.log(`error occurred: ${err}`);
               }
               else if(check.isEmpty(user)){
                   console.log("Couldn't find user");
               }
               else { 
                   roomObj={rooms:user.rooms}               
                   resolve(roomObj)                                                                
               }
           });})
           }              
           findUser().then((resolve)=>{resolve.rooms.forEach(room => {
               socket.join(room);
           });})            
        }); 
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "set-rooms" Set Rooms
         * @apiDescription When connected joins each room, that was previously joined.
         * 
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
        */
        socket.on('update-list',()=>{
               ChatRoomModel.find((err,result)=>{
                   if(err){
                       console.log(`error occurred: ${err}`);
                   }
                   else if(check.isEmpty(result)){
                       console.log("Couldn't find any active room");
                   }
                   else { allActiveRooms=[];
                       allActiveRooms=result;               
                       socket.emit('all-active-rooms',allActiveRooms);
                       socket.to(socket.defaultRoom).broadcast.emit('all-active-rooms',allActiveRooms);
                                                                           
                   }
               })
       
        })
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "update-list" Update List
         * @apiDescription Creates a list all the rooms in the server for the user and emits using "all-active-rooms".
         * 
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
               {
                    chatting:false,
                    members:["L5yGRz2bl", "tw-syQJJ9", "Y_nchyDcv"],
                    name:"New Title",
                    roomId:"wCLwqCRsp",
                    state:"active",
                    unread:0
               }
            ]
        */

        socket.on('create-chatRoom',(data)=>{
            if(!check.isEmpty(data.members)){
                let members=data.members;data.members=[];
                console.log("socket create-chatRoom was called")
                data['roomId']=shortid.generate();
                members.forEach(user => {
                    myIo.emit(user,`You have been added to ${data.roomName} by ${data.creatorName}`);
                });
                members.push(data.creatorId);
                console.log("Saving Room"+data);
                setTimeout(function(){
                    eventEmitter.emit('save-room', data);       //saving room to database
                },2000)
                setTimeout(function(){
                    members.forEach(userId => {
                    myIo.emit(userId,{'userId':userId,'roomId':data.roomId,'roomName':data.roomName,req:'join'})
                    })        //adding users to the room
                },2000)

                //updating list
                socket.to(socket.defaultRoom).broadcast.emit('setUpdate');
            }else{
                console.log("No members received in the room")
            }
        });
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {emit} "set-Update" set-Update
         * @apiDescription Sets the update on the user channel for updating the rooms list.
         *  
        */

        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "create-chatRoom" Create chat Room
         * @apiDescription Creates a chat room with the data received, broadcast users that they have been added, updates every required Model and sends updated rooms list.
         * 
         * @apiParam {string} [roomName] room name. (required)
         * @apiParam {string} [creatorId] creator ID. (required)
         * @apiParam {string} [creatorName] creator name. (required)
         * @apiParam {Array} [members] list of members. (required)
         * @apiParam {string} [state] active/inactive. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
             {
                    chatting:false,
                    members:["L5yGRz2bl", "tw-syQJJ9", "Y_nchyDcv"],
                    name:"New Title",
                    roomId:"wCLwqCRsp",
                    state:"active",
                    unread:0
               }   
            ]
        */
        
        socket.on('join-room',(data)=>{                         
            eventEmitter.emit('add-to-room',(data));
            socket.join(data.roomId);
            myIo.emit(socket.userId,`You have successfully joined the room ${data.roomName}`)
            socket.to(data.roomId).broadcast.emit('roomMessage',`${data.userName} has joined ${data.roomName}.`)
            //updating list
            socket.to(socket.defaultRoom).broadcast.emit('setUpdate');
        })
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "join-room" Join Room
         * @apiDescription Joins a chat room & updates every related Model,updates rooms list and send message to other users inside that room.
         * 
         * @apiParam {string} [roomName] room name. (required)
         * @apiParam {string} [roomId] room id. (required)
         * @apiParam {string} [userId] creator name. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
               {
                    chatting:false,
                    members:["L5yGRz2bl", "tw-syQJJ9", "Y_nchyDcv"],
                    name:"New Title",
                    roomId:"wCLwqCRsp",
                    state:"active",
                    unread:0
               }
            ]
        */
        socket.on('delete-room',(data)=>{
           try
           {console.log(` Deleting room ${data.roomName}`);
            var removeIndex = allActiveRooms.map(function(room) { return room.roomId; }).indexOf(data.roomId);
            allActiveRooms.splice(removeIndex,1)
            socket.to(data.roomId).broadcast.emit("leave-room-onDelete",{
                roomId:roomId,roomName:roomName}); 
            myIo.emit(socket.userId,`${data.roomName} has been removed`)
            socket.to(roomId).broadcast.emit('roomMessage',`${data.roomName} was Deleted.`)
            eventEmitter.emit('remove-room',(roomId)); //deleting room model
            //updating list
            socket.to(socket.defaultRoom).broadcast.emit('setUpdate');
            }
            catch(err){ 
            myIo.emit(socket.userId,"Room not deleted successfully.")
            }
        });
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {emit} "leave-room-onDelete" Leave Room on Delete
         * @apiDescription To leave room, as it was deleting.
         * 
         * @apiParam {string} [roomName] room name. (required)
         * @apiParam {string} [roomId] room Id. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
        */
       
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "delete-room" Delete Room
         * @apiDescription Deletes a chat room, broadcast users for room deletetion,disconnect their sockets, updates every required Models and sends updated rooms list.
         * 
         * @apiParam {string} [roomName] room name. (required)
         * @apiParam {string} [roomId] room Id. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
                {
                    chatting:false,
                    members:["L5yGRz2bl", "tw-syQJJ9", "Y_nchyDcv"],
                    name:"New Title",
                    roomId:"wCLwqCRsp",
                    state:"active",
                    unread:0
               }
            ]
        */
        socket.on('leave-room',(data)=>{
            //console.log(`room to be delted ${data}`);
            eventEmitter.emit('remove-from-room',(data));
            socket.leave(data.roomId);
            if(data.req==="kick"){
            myIo.emit(socket.userId,`You have been removed from ${data.roomName}.`)
            socket.to(data.roomId).broadcast.emit('roomMessage',`${data.userName} has been removed from ${data.roomName}.`)}
            else if(data.req==="delete")
            myIo.emit(socket.userId,`${data.roomName} was deleted.`)
            else if(data.req==="leave"){
            myIo.emit(data.userId,(`You have left ${data.roomName}`))
            socket.to(data.roomId).broadcast.emit('roomMessage',`${data.userName} has left ${data.roomName}.`)}
            //update list
            socket.to(socket.defaultRoom).broadcast.emit('setUpdate');
        })
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "leave-room" Leave Room
         * @apiDescription Handles kick,onDeleteRoom,leave requests & send broadcast to the users for leaving else gets notified if kicked, updates every required Model and sends updated rooms list.
         * 
         * @apiParam {string} [roomName] room name. (required)
         * @apiParam {string} [roomId] room Id. (required)
         * @apiParam {string} [userName] name of the user leaving the room. (required)
         * @apiParam {string} [req] leave/kick/delete. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
                {
                    chatting:false,
                    members:["L5yGRz2bl", "tw-syQJJ9", "Y_nchyDcv"],
                    name:"New Title",
                    roomId:"wCLwqCRsp",
                    state:"active",
                    unread:0
               }
            ]
        */
        socket.on('kick-from-room',(data)=>{
            myIo.emit(data.userId,(data));
        })
        /**
        * @apiGroup Events
        * @apiVersion  1.0.0
        * @api {on} "kick-from-room" Kick From Room
        * @apiDescription Accepts request for kick and emits to correspoding user to leave the room with a req kick.
        * 
        * @apiParam {string} [roomName] room name. (required)
        * @apiParam {string} [roomId] roomId. (required)
        * @apiParam {string} [userId] creator name. (required)
        * @apiParam {string} [userName] list of members. (required)
        * @apiParam {string} [req] kick. (required)
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
       */
        socket.on('update-room',(data)=>{
            eventEmitter.emit('update-room',(data));
            if(!check.isEmpty(data.state)){
                if(data.state=='active')
                socket.to(data.roomId).broadcast.emit('roomMessage','Room was marked active');
                else(data.state=='inactive')
                socket.to(data.roomId).broadcast.emit('roomMessage','Room was marked inactive');
            }
            if(!check.isEmpty(data.roomName))
            socket.to(data.roomId).broadcast.emit('roomMessage',`${data.previousroomName} has been changed to ${data.roomName}`);
            //update list
            socket.to(socket.defaultRoom).broadcast.emit('setUpdate');

        })
        /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {on} "update-room" Update Room
         * @apiDescription Updates a room state and title, broadcast its update to members in it,updates every required Model, and sends updated room List.
         * 
         * @apiParam {string} [roomName] room name. (required)
         * @apiParam {string} [creatorId] creator ID. (required)
         * @apiParam {string} [creatorName] creator name. (required)
         * @apiParam {Array} [members] list of members. (required)
         * @apiParam {string} [state] active/inactive. (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            [
                {
                    chatting:false,
                    members:["L5yGRz2bl", "tw-syQJJ9", "Y_nchyDcv"],
                    name:"New Title",
                    roomId:"wCLwqCRsp",
                    state:"active",
                    unread:0
               }
            ]
        */

       /**
         * @apiGroup Events
         * @apiVersion  1.0.0
         * @api {emit} ":userId"  myIO
         * @apiDescription myIO sending meesage to user Id.
         * 
         * @apiParam {string} [data] data. (required)
        */
    });
}

// database operations are kept outside of socket.io code.

// saving chats to database.
eventEmitter.on('save-chat', (data) => {
    // let today = Date.now();
    let newChat = new ChatModel({
        chatId: data.chatId,
        senderName: data.senderName,
        senderId: data.senderId,
        receiverName: data.receiverName || '',
        receiverId: data.receiverId || '',
        message: data.message,
        chatRoom: data.chatRoom || '',
        createdOn: data.createdOn
    });

    newChat.save((err,result) => {
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(result == undefined || result == null || result == ""){
            console.log("Chat Is Not Saved.");
        }
        else {
            console.log("Chat Saved.");
            console.log(result);
        }
    });

})
 // end of saving chat.

// saving Chat Room to dataBase
eventEmitter.on('save-room',(data)=>{
    let chatRoomModel =new ChatRoomModel({
       roomId:data.roomId,
       roomName:data.roomName,
       createdOn:data.createdOn,
       creatorId:data.creatorId,
       creatorName:data.creatorName,
       members:data.members,
       modifiedOn:data.modifiedOn,
       state:data.state 
    })
    chatRoomModel.save((err,result)=>{
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(result == undefined || result == null || result == ""){
            console.log("Chat Room Is Not Saved.");
        }
        else {
            console.log("Chat Room Saved.");
            console.log(result);
        }
    })
})
// end of saving Chat room to dataBase

//saving chatRooms to userModel
eventEmitter.on('add-to-room',(data)=>{
    UserModel.findOneAndUpdate({'userId':data.userId},{$push:{rooms:data.roomId}},(err,user)=>{
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(user == undefined || user == null || user == ""){
            console.log("Room not added to userModel");
        }
        else {
            console.log(" Room added to UserModel.");
        }
    })        
    ChatRoomModel.findOneAndUpdate({'roomId':data.roomId},{$push:{members:data.userId}},(err,room)=>{
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(room == undefined || room == null || room == ""){
            console.log("User not added to the ChatRoomModel");
        }
        else {
            console.log(" User added to ChatRoomModel.");
        }
    })
})
//end of saving chatRooms to userModel

//deleting room 
eventEmitter.on('remove-room',(roomId)=>{
    ChatRoomModel.findOneAndRemove({'roomId':roomId},(err,result)=>{
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(result == undefined || result == null || result == ""){
            console.log("Room Not found.");
        }
        else {
            result.members.forEach(user => {
                console.log(`Deleting user ${user} from ${roomId}`)
                eventEmitter.emit('remove-from-room',({'userId':user,'roomId':roomId}));
            });
            //console.log("Chat Room deleted.");
        }        
    })
})
// end of deleting room 

// removing user from room 
eventEmitter.on('remove-from-room',(data)=>{
    UserModel.update({'userId':data.userId},{$pull:{rooms:data.roomId}},(err,result)=>{
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(result == undefined || result == null || result == ""){
            console.log("User Not found.");
        }
        else {
            console.log(`User ${data.userId} Removed from Chat Room.${data.roomId}`);
        }
    })
    ChatRoomModel.findOneAndUpdate({'roomId':data.roomId},{$pull:{members:data.userId}},(err,room)=>{
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(room == undefined || room == null || room == ""){
            console.log("User not removed from the Room");
        }
        else {
            console.log(" User removed from RoomModel.");
        }
    })
})
//end of removing user from room

// updating room
eventEmitter.on('update-room',(data)=>{
    let options={};
    if((!check.isEmpty(data.roomName)) && (!check.isEmpty(data.state))){
        options={roomName:data.roomName,state:data.state}
    }else if((!check.isEmpty(data.roomName)) && (check.isEmpty(data.state))){
        options={roomName:data.roomName}
    }else if((check.isEmpty(data.roomName)) && (!check.isEmpty(data.state))){
        options={state:data.state}
    }
    ChatRoomModel.findOneAndUpdate({'roomId':data.roomId},options)
    .exec((err,result)=>{
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(result == undefined || result == null || result == ""){
            console.log("Chat Room wasn't found");
        }
        else {
            console.log('room Updated Successfully');
        }
    })
})
//emd of updatin room
module.exports = {
    setServer: setServer
}
