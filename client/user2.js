// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjJxSUZ1R0tkeSIsImlhdCI6MTUzMTcyNzMzNDcyOSwiZXhwIjoxNTMxODEzNzM0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImRlZmF1bHRBcHBSb29tIjoiQ2hhdEFwcFJvb20iLCJyb29tcyI6W10sIm1vYmlsZU51bWJlciI6Nzg5Njc4NTY3NCwiZW1haWwiOiJ1c2VyMTA3QGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiUyIsImZpcnN0TmFtZSI6InVzZXIxMDciLCJ1c2VySWQiOiJvQVZEeFJmR0QifX0.rUo0qV8ehu4gcM-4-aq8RXsFxVVr0-xQBgn6rL1d8Yk"
const userId= "oAVDxRfGD"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: '',//putting user2's id here 
  receiverName: "Mr Xyz",
  senderId: userId,
  senderName: "Aditya Kumar"
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
    }else{
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
    socket.emit("chat-msg",chatMessage)
  })
  $("#messageToSend").on('keypress', function () {
   socket.emit("typing","Aditya Kumar")
  })

  //rooms related sockets
  $("#create-room").on('click',()=>{
    socket.emit("create-chatRoom",chatRoom)
    socket.emit("set-rooms")
  })
  $("#delete-room").on('click',()=>{
    socket.emit("delete-room","vpOPWH8G1");
    socket.emit("set-rooms");
  })
  $("#remove-user-from-room").on('click',()=>{
    socket.emit("remove-user-from-room",({userId:"oAVDxRfGD",roomId:"yf_cs4jF5"}))
  })
  $("#join-room").on('click',()=>{
    socket.emit('join-room',({userId:"oAVDxRfGD",roomId:"yf_cs4jF5"}))
  })
  $("#change-state").on('click',()=>{
    socket.emit('change-state',({roomId:"",state:"inactive"}))
  })
}// end chat socket function

chatSocket();
