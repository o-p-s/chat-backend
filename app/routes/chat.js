const express = require('express');
const router = express.Router();
const chatController = require("./../../app/controllers/chatController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

  let baseUrl = `${appConfig.apiVersion}/chat`;

  app.get(`${baseUrl}/get/for/user`, auth.isAuthorized,chatController.getUsersChat);
   /**  
   * @apiGroup Read
   * @apiVersion  1.0.0
   * @api {get} /api/v1/chat/get/for/user User Paginated chats.
   * @apiDescription Gets Paginated Chats for a user
   * 
   * @apiParam {string} [authToken] authToken of requesting user. (query params) (required)
   * @apiParam {string} [senderId] userId of logged in user. (query params) (required)
   * @apiParam {string} [receiverId] userId receiving user. (query params) (required)
   * @apiParam {number} skip skip value for pagination. (query params) (optional)
   *
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
     {
        "error": false,
        "message": "All Chats Listed",
        "status": 200,
        "data": [
                    {
                        "chatId": "K5-BAf23y",
                        "modifiedOn": "2018-07-21T07:05:08.820Z",
                        "createdOn": "2018-07-21T07:05:06.815Z",
                        "seen": false,
                        "message": "hi",
                        "receiverId": "tw-syQJJ9",
                        "receiverName": "User11 L11",
                        "senderId": "Y_nchyDcv",
                        "senderName": "user103 S"
                    },
                    {
                        "chatId": "jATTyYWWN",
                        "modifiedOn": "2018-07-21T07:38:18.165Z",
                        "createdOn": "2018-07-21T07:38:16.161Z",
                        "seen": false,
                        "message": "hey!",
                        "receiverId": "tw-syQJJ9",
                        "receiverName": "User11 L11",
                        "senderId": "Y_nchyDcv",
                        "senderName": "user103 S"
                    },
                    {
                        "chatId": "rGv4BwE60",
                        "modifiedOn": "2018-07-21T07:38:34.679Z",
                        "createdOn": "2018-07-21T07:38:32.676Z",
                        "seen": false,
                        "message": "What's Up!",
                        "receiverId": "tw-syQJJ9",
                        "receiverName": "User11 L11",
                        "senderId": "Y_nchyDcv",
                        "senderName": "user103 S"
                    },
                    {
                        "chatId": "5kbu16685",
                        "modifiedOn": "2018-07-21T07:38:43.557Z",
                        "createdOn": "2018-07-21T07:38:41.554Z",
                        "seen": false,
                        "message": "All Good.",
                        "receiverId": "Y_nchyDcv",
                        "receiverName": "user103 S",
                        "senderId": "tw-syQJJ9",
                        "senderName": "User11 L11"
                    }
                ]
        }
   */

  app.get(`${baseUrl}/get/for/group`, auth.isAuthorized,chatController.getGroupChat);
  /**
  * @apiGroup Read
  * @apiVersion  1.0.0
  * @api {get} /api/v1/chat/get/for/group Room Paginated chats.
  * @apiDescription Gets paginated chats for a room
  * 
  * @apiParam {string} [roomId] roomId of desired chats. (query params) (required)
  * @apiParam {string} [authToken] authToken of requesting user. (query params) (required)
  * @apiParam {number} skip skip value for pagination. (query params) (optional)
  *
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.
  * 
  * @apiSuccessExample {object} Success-Response:
    {
      "error": false,
      "message": "All Group Chats Listed",
      "status": 200,
      "data": [
          {
              "chatId": "vMqB1u-Rb",
              "modifiedOn": "2018-07-18T19:29:18.287Z",
              "createdOn": "2018-07-18T19:29:16.283Z",
              "seen": false,
              "chatRoom": true,
              "message": "Hey!",
              "senderId": "tw-syQJJ9",
              "senderName": "User11 L11"
          },
          {
              "chatId": "hmjK_8fS1",
              "modifiedOn": "2018-07-18T19:35:15.276Z",
              "createdOn": "2018-07-18T19:35:13.273Z",
              "seen": false,
              "chatRoom": true,
              "message": "Hi",
              "senderId": "L5yGRz2bl",
              "senderName": "user106 S"
          },
          {
              "chatId": "LnHKIvm1q",
              "modifiedOn": "2018-07-21T07:46:21.060Z",
              "createdOn": "2018-07-21T07:46:19.056Z",
              "seen": false,
              "chatRoom": true,
              "message": "Nice to meet you!",
              "senderId": "Y_nchyDcv",
              "senderName": "user103 S"
          }
      ]
  }
  */
  app.get(`${baseUrl}/get/all/rooms`,auth.isAuthorized, chatController.findallrooms);  
  /**
  * @apiGroup Read
  * @apiVersion  1.0.0
  * @api {get} /api/v1/chat/get/all/rooms All Chat rooms.
  * @apiDescription Gets all Chat Rooms
  * 
  * @apiParam {string} [authToken] authToken of requesting user. (query params) (required)
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.
  * 
  * @apiSuccessExample {object} Success-Response:
      {
        "error": false,
        "message": "All Rooms Found",
        "status": 200,
        "data": [
            {
                "roomId": "wCLwqCRsp",
                "state": "active",
                "modifiedOn": "2018-07-18T19:22:25.862Z",
                "members": [
                    "L5yGRz2bl",
                    "tw-syQJJ9",
                    "Y_nchyDcv"
                ],
                "creatorId": "tw-syQJJ9",
                "creatorName": "User11 L11",
                "createdOn": "2018-07-18T19:22:25.862Z",
                "roomName": "New Title"
            }
        ]
    }
  */ 
  
  app.post(`${baseUrl}/mark/as/seen`,auth.isAuthorized, chatController.markChatAsSeen);
    /**
  * @apiGroup Update
  * @apiVersion  1.0.0
  * @api {post} /api/v1/chat/mark/as/seen Mark Chats seen
  * @apiDescription Mark seen to all unseen chats of sender.
  * 
  * @apiParam {string} [userId] userId of requesting user. (query params) (required)
  * @apiParam {string} [authToken] authToken of requesting user. (query params) (required)
  * @apiParam {string} [senderId] senderId of the requested chat. (query params) (optional)
  * 
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.
  * 
  * @apiSuccessExample {object} Success-Response:
      {
        "error": false,
        "message": "Unseen Chats found",
        "status": 200,
        "data": {
            n:31,
            nModified:2,
            ok:1
        }
    }
  */ 

  app.get(`${baseUrl}/count/unseen`,auth.isAuthorized, chatController.countUnSeenChat);
  /**
  * @apiGroup Read
  * @apiVersion  1.0.0
  * @api {get} /api/v1/chat/count/unseen  All Unseen Chats.
  * @apiDescription Gets count for all unseen chats of a user 
  * @apiParam {string} [userId] userId of requesting user. (query params) (required)
  * @apiParam {string} [authToken] authToken of requesting user. (query params) (required)
  * @apiParam {string} senderId senderId of the requested chat. (query params) (optional)
  * 
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.
  * 
  * @apiSuccessExample {object} Success-Response:
      {
        "error": false,
        "message": "Unseen Chats found",
        "status": 200,
        "data": 2
            
    }
  */ 
  // params: userId, senderId, skip.
  //app.get(`${baseUrl}/find/unseen`, chatController.findUnSeenChat);

  // params: userId.
  //app.get(`${baseUrl}/unseen/user/list`, chatController.findUserListOfUnseenChat);

}
