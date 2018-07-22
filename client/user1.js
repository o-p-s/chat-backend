// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InhDYTRuRWNuSyIsImlhdCI6MTUzMTcyNzI2Nzk4MCwiZXhwIjoxNTMxODEzNjY3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImRlZmF1bHRBcHBSb29tIjoiQ2hhdEFwcFJvb20iLCJyb29tcyI6W10sIm1vYmlsZU51bWJlciI6Nzg5Njc4NTY3NCwiZW1haWwiOiJ1c2VyMTA2QGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiUyIsImZpcnN0TmFtZSI6InVzZXIxMDYiLCJ1c2VySWQiOiJMNXlHUnoyYmwifX0.f5zy840tTHATh7FGkdQtfcsJNziP2i7K_4I1xlEr764"
const userId = "L5yGRz2bl"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: '8TyOEwb7t',//putting user2's id here 
  receiverName: "A K",
  senderId: userId,
  senderName: "Mr Xyz"
}
let chatRoom={
  roomName:'Cool9',
  state:'active',
  createdOn: Date.now(),
  members: ['oAVDxRfGD'],//putting user2's id here 
  creatorName: "O P",
  creatorId: userId,
  modifiedOn:Date.now()
}
let chatSocket = () => {

  socket.on('verifyUser', (data) => {
    console.log("socket trying to verify user");
    socket.emit("set-user", authToken);
    socket.emit("set-rooms")
  });
  
  socket.on(userId, (data) => {
    if(data.senderName){
      console.log("you received a message from "+data.senderName)
      console.log(data.message)
    }else if(data.req==="join"){
      socket.emit('join-room',({userId:userId,roomId:data.roomId}))
    }else if(data.req==="kick"){
      socket.emit("leave-room",(data))
    }
    else{
      console.log(data);
    }
  });

  socket.on("online-user-list", (data) => {
    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)
  });
 
  socket.on("all-active-rooms",(data)=>{
    console.log("All Active Rooms");
    console.log(data)
  })
  socket.on("typing", (data) => {
    console.log(data+" is typing") 
  });
  socket.on("leave-room-onDelete",(roomId)=>{
    console.log(`room to be deleted.${roomId}`)
    socket.emit("leave-room",({userId:userId,roomId:roomId,req:"delete"}))
  });

  $("#send").on('click', function () {
    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    //socket.emit("chat-msg",chatMessage)
  })
  $("#messageToSend").on('keypress', function () {
    socket.emit("typing","Mr Xyz")
  })
  //rooms related sockets
  $("#create-room").on('click',()=>{
    socket.emit("create-chatRoom",chatRoom)
  })
  $("#delete-room").on('click',()=>{
    socket.emit("delete-room","sfNZMWQVD");
  })
  $("#kick-from-room").on('click',()=>{
    socket.emit("kick-from-room",({userId:"oAVDxRfGD",roomId:"AUQAOIJbS"}))
  })
  $("#join-room").on('click',()=>{
    socket.emit('join-room',({userId:userId,roomId:"yf_cs4jF5"}))
  })
  $("#change-state").on('click',()=>{
    socket.emit('change-state',({roomId:"",state:"inactive"}))
  })
  $("#change-room-name").on("click",()=>{
    socket.emit('change-room-title',({roomId:"",name:"newNAme"}))
  })
}// end chat socket function

chatSocket();
