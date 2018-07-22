define({ "api": [
  {
    "group": "Create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/send-invites",
    "title": "Room invites.",
    "description": "<p>Sends Room Invite to multiple users.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderName",
            "description": "<p>name of the user sending. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomId",
            "description": "<p>id of the room for inviting. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "members",
            "description": "<p>name of the user sending. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomName",
            "description": "<p>name of the room for inviting. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Invites sent!\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Create",
    "name": "PostApiV1UsersSendInvites"
  },
  {
    "group": "Create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "Signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>password of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "firstName",
            "description": "<p>password of the user. (body params) (required)     *</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "latName",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Successfully Created\",\n    \"status\": 200,\n    \"data\": {\n        \"createdOn\": \"2018-07-21T06:24:52.000Z\",\n        \"mobileNumber\": 7896785674,\n        \"email\": \"trial00@gmail.com\",\n        \"lastName\": \"Account\",\n        \"firstName\": \"Trial\",\n        \"userId\": \"AX89NnZ0g\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Create",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "Delete",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/delete/:usrId",
    "title": "Delete user.",
    "description": "<p>Deletes a user from database.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User Deleted Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Delete",
    "name": "PostApiV1UsersDeleteUsrid"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "emit",
    "url": "\"leave-room-onDelete\"",
    "title": "Leave Room on Delete",
    "description": "<p>To leave room, as it was deleting.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomName",
            "description": "<p>room name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomId",
            "description": "<p>room Id. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      }
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "EmitLeaveRoomOndelete"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "emit",
    "url": "\"online-user-list\"",
    "title": "Online User List",
    "description": "<p>Sends an online users list.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        fullName:\"User11 L11\",\n        userId:\"tw-syQJJ9\"\n    },\n    {\n        fullName:\"user103 S\",\n        userId:\"Y_nchyDcv\"\n    }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "EmitOnlineUserList"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "emit",
    "url": "\"roomMessage\"",
    "title": "Room Message",
    "description": "<p>Sends data/message to a room.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderName",
            "description": "<p>sender name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderId",
            "description": "<p>sender Id. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverName",
            "description": "<p>receiver name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverId",
            "description": "<p>receiver Id. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "message",
            "description": "<p>message. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      }
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "EmitRoommessage"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "emit",
    "url": "\"set-Update\"",
    "title": "set-Update",
    "description": "<p>Sets the update on the user channel for updating the rooms list.</p>",
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "EmitSetUpdate"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "emit",
    "url": "\"typing\"",
    "title": "Typing",
    "description": "<p>Sends the userinfo who is typing.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderName",
            "description": "<p>sender name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverId",
            "description": "<p>receiver Id. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverName",
            "description": "<p>receiver name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "req",
            "description": "<p>&quot;user&quot;. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      }
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "EmitTyping"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "emit",
    "url": "\":userId\"",
    "title": "myIO",
    "description": "<p>myIO sending meesage to user Id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "data",
            "description": "<p>data. (required)</p>"
          }
        ]
      }
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "EmitUserid"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"chat-msg\"",
    "title": "Chat Message",
    "description": "<p>Save the chat Message, inform the room if sent in a room else sends to the receiver.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderName",
            "description": "<p>sender name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderId",
            "description": "<p>sender Id. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverName",
            "description": "<p>receiver name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverId",
            "description": "<p>receiver Id. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "message",
            "description": "<p>message. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    chatId:\"WVs4gOvNN\",\n    chatRoom:false,\n    createdOn:\"2018-07-21T20:33:05.720Z\",\n    message:\"hey\",\n    modifiedOn:\"2018-07-21T20:33:05.720Z\",\n    receiverId:\"tw-syQJJ9\",\n    receiverName:\"User11 L11\"\n    seen:false,\n    senderId:\"Y_nchyDcv\",\n    senderName:\"user103 S\"\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnChatMsg"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"create-chatRoom\"",
    "title": "Create chat Room",
    "description": "<p>Creates a chat room with the data received, broadcast users that they have been added, updates every required Model and sends updated rooms list.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomName",
            "description": "<p>room name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "creatorId",
            "description": "<p>creator ID. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "creatorName",
            "description": "<p>creator name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "members",
            "description": "<p>list of members. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "state",
            "description": "<p>active/inactive. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n        chatting:false,\n        members:[\"L5yGRz2bl\", \"tw-syQJJ9\", \"Y_nchyDcv\"],\n        name:\"New Title\",\n        roomId:\"wCLwqCRsp\",\n        state:\"active\",\n        unread:0\n   }   \n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnCreateChatroom"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"delete-room\"",
    "title": "Delete Room",
    "description": "<p>Deletes a chat room, broadcast users for room deletetion,disconnect their sockets, updates every required Models and sends updated rooms list.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomName",
            "description": "<p>room name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomId",
            "description": "<p>room Id. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        chatting:false,\n        members:[\"L5yGRz2bl\", \"tw-syQJJ9\", \"Y_nchyDcv\"],\n        name:\"New Title\",\n        roomId:\"wCLwqCRsp\",\n        state:\"active\",\n        unread:0\n   }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnDeleteRoom"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"disconnect\"",
    "title": "Disconnect",
    "description": "<p>Disconnect the user from socket,remove the user from online list, unsubscribe the user from his own channel and emit updated list.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        fullName:\"User11 L11\",\n        userId:\"tw-syQJJ9\"\n    },\n    {\n        fullName:\"user103 S\",\n        userId:\"Y_nchyDcv\"\n    }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnDisconnect"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"join-room\"",
    "title": "Join Room",
    "description": "<p>Joins a chat room &amp; updates every related Model,updates rooms list and send message to other users inside that room.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomName",
            "description": "<p>room name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomId",
            "description": "<p>room id. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>creator name. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n   {\n        chatting:false,\n        members:[\"L5yGRz2bl\", \"tw-syQJJ9\", \"Y_nchyDcv\"],\n        name:\"New Title\",\n        roomId:\"wCLwqCRsp\",\n        state:\"active\",\n        unread:0\n   }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnJoinRoom"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"kick-from-room\"",
    "title": "Kick From Room",
    "description": "<p>Accepts request for kick and emits to correspoding user to leave the room with a req kick.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomName",
            "description": "<p>room name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomId",
            "description": "<p>roomId. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>creator name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userName",
            "description": "<p>list of members. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "req",
            "description": "<p>kick. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      }
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnKickFromRoom"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"leave-room\"",
    "title": "Leave Room",
    "description": "<p>Handles kick,onDeleteRoom,leave requests &amp; send broadcast to the users for leaving else gets notified if kicked, updates every required Model and sends updated rooms list.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomName",
            "description": "<p>room name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomId",
            "description": "<p>room Id. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userName",
            "description": "<p>name of the user leaving the room. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "req",
            "description": "<p>leave/kick/delete. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        chatting:false,\n        members:[\"L5yGRz2bl\", \"tw-syQJJ9\", \"Y_nchyDcv\"],\n        name:\"New Title\",\n        roomId:\"wCLwqCRsp\",\n        state:\"active\",\n        unread:0\n   }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnLeaveRoom"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"on-typing\"",
    "title": "On Typing",
    "description": "<p>Receives userinfo and emit &quot;typing&quot; accordingly (room/user).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderName",
            "description": "<p>sender name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverId",
            "description": "<p>receiver Id. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverName",
            "description": "<p>receiver name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "req",
            "description": "<p>&quot;user&quot;. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    receiverId:\"tw-syQJJ9\",\n    req:\"user\",\n    userName:\"user103 S\"\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnOnTyping"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"set-rooms\"",
    "title": "Set Rooms",
    "description": "<p>When connected joins each room, that was previously joined.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      }
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnSetRooms"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"set-user\"",
    "title": "Set User",
    "description": "<p>Verifies authenticated token, set user on online users list and emit updated list.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>token for verification. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        fullName:\"User11 L11\",\n        userId:\"tw-syQJJ9\"\n    },\n    {\n        fullName:\"user103 S\",\n        userId:\"Y_nchyDcv\"\n    }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnSetUser"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"update-list\"",
    "title": "Update List",
    "description": "<p>Creates a list all the rooms in the server for the user and emits using &quot;all-active-rooms&quot;.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n   {\n        chatting:false,\n        members:[\"L5yGRz2bl\", \"tw-syQJJ9\", \"Y_nchyDcv\"],\n        name:\"New Title\",\n        roomId:\"wCLwqCRsp\",\n        state:\"active\",\n        unread:0\n   }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnUpdateList"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"update-room\"",
    "title": "Update Room",
    "description": "<p>Updates a room state and title, broadcast its update to members in it,updates every required Model, and sends updated room List.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomName",
            "description": "<p>room name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "creatorId",
            "description": "<p>creator ID. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "creatorName",
            "description": "<p>creator name. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "members",
            "description": "<p>list of members. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "state",
            "description": "<p>active/inactive. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        chatting:false,\n        members:[\"L5yGRz2bl\", \"tw-syQJJ9\", \"Y_nchyDcv\"],\n        name:\"New Title\",\n        roomId:\"wCLwqCRsp\",\n        state:\"active\",\n        unread:0\n   }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnUpdateRoom"
  },
  {
    "group": "Events",
    "version": "1.0.0",
    "type": "on",
    "url": "\"verify-invite\"",
    "title": "Verify token.",
    "description": "<p>Verifies a Invite Token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "token",
            "description": "<p>invite token. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n     'error':false,\n     'message':'Verified Invite',\n     'status':200,\n     'data':verified and decoded data\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "Events",
    "name": "OnVerifyInvite"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/chat/count/unseen",
    "title": "All Unseen Chats.",
    "description": "<p>Gets count for all unseen chats of a user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>userId of requesting user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>senderId of the requested chat. (query params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"Unseen Chats found\",\n    \"status\": 200,\n    \"data\": 2\n        \n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Read",
    "name": "GetApiV1ChatCountUnseen"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/chat/get/all/rooms",
    "title": "All Chat rooms.",
    "description": "<p>Gets all Chat Rooms</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"All Rooms Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"roomId\": \"wCLwqCRsp\",\n            \"state\": \"active\",\n            \"modifiedOn\": \"2018-07-18T19:22:25.862Z\",\n            \"members\": [\n                \"L5yGRz2bl\",\n                \"tw-syQJJ9\",\n                \"Y_nchyDcv\"\n            ],\n            \"creatorId\": \"tw-syQJJ9\",\n            \"creatorName\": \"User11 L11\",\n            \"createdOn\": \"2018-07-18T19:22:25.862Z\",\n            \"roomName\": \"New Title\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Read",
    "name": "GetApiV1ChatGetAllRooms"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/chat/get/for/group",
    "title": "Room Paginated chats.",
    "description": "<p>Gets paginated chats for a room</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "roomId",
            "description": "<p>roomId of desired chats. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "skip",
            "description": "<p>skip value for pagination. (query params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"All Group Chats Listed\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"chatId\": \"vMqB1u-Rb\",\n            \"modifiedOn\": \"2018-07-18T19:29:18.287Z\",\n            \"createdOn\": \"2018-07-18T19:29:16.283Z\",\n            \"seen\": false,\n            \"chatRoom\": true,\n            \"message\": \"Hey!\",\n            \"senderId\": \"tw-syQJJ9\",\n            \"senderName\": \"User11 L11\"\n        },\n        {\n            \"chatId\": \"hmjK_8fS1\",\n            \"modifiedOn\": \"2018-07-18T19:35:15.276Z\",\n            \"createdOn\": \"2018-07-18T19:35:13.273Z\",\n            \"seen\": false,\n            \"chatRoom\": true,\n            \"message\": \"Hi\",\n            \"senderId\": \"L5yGRz2bl\",\n            \"senderName\": \"user106 S\"\n        },\n        {\n            \"chatId\": \"LnHKIvm1q\",\n            \"modifiedOn\": \"2018-07-21T07:46:21.060Z\",\n            \"createdOn\": \"2018-07-21T07:46:19.056Z\",\n            \"seen\": false,\n            \"chatRoom\": true,\n            \"message\": \"Nice to meet you!\",\n            \"senderId\": \"Y_nchyDcv\",\n            \"senderName\": \"user103 S\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Read",
    "name": "GetApiV1ChatGetForGroup"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/chat/get/for/user",
    "title": "User Paginated chats.",
    "description": "<p>Gets Paginated Chats for a user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderId",
            "description": "<p>userId of logged in user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "receiverId",
            "description": "<p>userId receiving user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "skip",
            "description": "<p>skip value for pagination. (query params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All Chats Listed\",\n   \"status\": 200,\n   \"data\": [\n               {\n                   \"chatId\": \"K5-BAf23y\",\n                   \"modifiedOn\": \"2018-07-21T07:05:08.820Z\",\n                   \"createdOn\": \"2018-07-21T07:05:06.815Z\",\n                   \"seen\": false,\n                   \"message\": \"hi\",\n                   \"receiverId\": \"tw-syQJJ9\",\n                   \"receiverName\": \"User11 L11\",\n                   \"senderId\": \"Y_nchyDcv\",\n                   \"senderName\": \"user103 S\"\n               },\n               {\n                   \"chatId\": \"jATTyYWWN\",\n                   \"modifiedOn\": \"2018-07-21T07:38:18.165Z\",\n                   \"createdOn\": \"2018-07-21T07:38:16.161Z\",\n                   \"seen\": false,\n                   \"message\": \"hey!\",\n                   \"receiverId\": \"tw-syQJJ9\",\n                   \"receiverName\": \"User11 L11\",\n                   \"senderId\": \"Y_nchyDcv\",\n                   \"senderName\": \"user103 S\"\n               },\n               {\n                   \"chatId\": \"rGv4BwE60\",\n                   \"modifiedOn\": \"2018-07-21T07:38:34.679Z\",\n                   \"createdOn\": \"2018-07-21T07:38:32.676Z\",\n                   \"seen\": false,\n                   \"message\": \"What's Up!\",\n                   \"receiverId\": \"tw-syQJJ9\",\n                   \"receiverName\": \"User11 L11\",\n                   \"senderId\": \"Y_nchyDcv\",\n                   \"senderName\": \"user103 S\"\n               },\n               {\n                   \"chatId\": \"5kbu16685\",\n                   \"modifiedOn\": \"2018-07-21T07:38:43.557Z\",\n                   \"createdOn\": \"2018-07-21T07:38:41.554Z\",\n                   \"seen\": false,\n                   \"message\": \"All Good.\",\n                   \"receiverId\": \"Y_nchyDcv\",\n                   \"receiverName\": \"user103 S\",\n                   \"senderId\": \"tw-syQJJ9\",\n                   \"senderName\": \"User11 L11\"\n               }\n           ]\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Read",
    "name": "GetApiV1ChatGetForUser"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/all",
    "title": "All users.",
    "description": "<p>Get list of all users</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    [  \n        {\n            \"rooms\": [],\n            \"createdOn\": \"2018-07-20T06:16:11.000Z\",\n            \"mobileNumber\": 0,\n            \"email\": \"sam2mail@gmail.com\",\n            \"lastName\": \"Ple\",\n            \"firstName\": \"Sam\",\n            \"userId\": \"-mriqchCn\"\n        },\n        {\n            \"defaultAppRoom\": \"ChatAppRoom\",\n            \"rooms\": [],\n            \"createdOn\": \"2018-07-21T06:24:52.000Z\",\n            \"mobileNumber\": 7896785674,\n            \"email\": \"trial00@gmail.com\",\n            \"lastName\": \"Account\",\n            \"firstName\": \"Trial\",\n            \"userId\": \"AX89NnZ0g\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Read",
    "name": "GetApiV1UsersAll"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId",
    "title": "Single user.",
    "description": "<p>Gets Single user from database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"defaultAppRoom\": \"ChatAppRoom\",\n        \"rooms\": [],\n        \"createdOn\": \"2018-07-21T06:24:52.000Z\",\n        \"mobileNumber\": 7896785674,\n        \"email\": \"trial00@gmail.com\",\n        \"lastName\": \"Account\",\n        \"firstName\": \"Trial\",\n        \"userId\": \"AX89NnZ0g\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Read",
    "name": "GetApiV1UsersUserid"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "Login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Logged In Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkFreGw5TEVQRiIsImlhdCI6MTUzMjE1NDM1MjUwNSwiZXhwIjoxNTMyMjQwNzUyLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImVtYWlsIjoidHJpYWwwMEBnbWFpbC5jb20iLCJsYXN0TmFtZSI6IkFjY291bnQiLCJmaXJzdE5hbWUiOiJUcmlhbCIsInVzZXJJZCI6IkFYODlOblowZyJ9fQ.BClXwBjVCApZPc5ca6c7W2ApwT5vD93NrUC154adUcg\",\n        \"userDetails\": {\n            \"email\": \"trial00@gmail.com\",\n            \"lastName\": \"Account\",\n            \"firstName\": \"Trial\",\n            \"userId\": \"AX89NnZ0g\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Read",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "Update",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/chat/mark/as/seen",
    "title": "Mark Chats seen",
    "description": "<p>Mark seen to all unseen chats of sender.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>userId of requesting user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "senderId",
            "description": "<p>senderId of the requested chat. (query params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n    \"error\": false,\n    \"message\": \"Unseen Chats found\",\n    \"status\": 200,\n    \"data\": {\n        n:31,\n        nModified:2,\n        ok:1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/chat.js",
    "groupTitle": "Update",
    "name": "PostApiV1ChatMarkAsSeen"
  },
  {
    "group": "Update",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgot-password",
    "title": "Forgot password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>email of the user. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"Kindly check your email for further instructions\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Update",
    "name": "PostApiV1UsersForgotPassword"
  },
  {
    "group": "Update",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "Logout.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "authToken",
            "description": "<p>authToken of requesting user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "Update",
    "name": "PostApiV1UsersLogout"
  }
] });
