const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.
    app.get(`${baseUrl}/all`,auth.isAuthorized, userController.getAllUsers);
       /**
     * @apiGroup Read
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/all All users.
     * @apiDescription Get list of all users
     *
     *@apiParam {string} [authToken] authToken of requesting user. (query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * 
     * @apiSuccessExample {object} Success-Response:
      {
        [  
            {
                "rooms": [],
                "createdOn": "2018-07-20T06:16:11.000Z",
                "mobileNumber": 0,
                "email": "sam2mail@gmail.com",
                "lastName": "Ple",
                "firstName": "Sam",
                "userId": "-mriqchCn"
            },
            {
                "defaultAppRoom": "ChatAppRoom",
                "rooms": [],
                "createdOn": "2018-07-21T06:24:52.000Z",
                "mobileNumber": 7896785674,
                "email": "trial00@gmail.com",
                "lastName": "Account",
                "firstName": "Trial",
                "userId": "AX89NnZ0g"
            }
        ]
    }
   */
    app.get(`${baseUrl}/:userId`,auth.isAuthorized, userController.getSingleUser);
    /**
     * @apiGroup Read
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:userId Single user.
     * @apiDescription Gets Single user from database 
     * @apiParam {string} [userId] userId of the user. (body params) (required)
     *@apiParam {string} [authToken] authToken of requesting user. (query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Details Found",
            "status": 200,
            "data": {
                "defaultAppRoom": "ChatAppRoom",
                "rooms": [],
                "createdOn": "2018-07-21T06:24:52.000Z",
                "mobileNumber": 7896785674,
                "email": "trial00@gmail.com",
                "lastName": "Account",
                "firstName": "Trial",
                "userId": "AX89NnZ0g"
            }
        }
   */
    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);
    /**
     * @apiGroup Create
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup Signup.
     *
     * @apiParam {string} [email] email of the user. (body params) (required)
     * @apiParam {string} [password] password of the user. (body params) (required)
     * @apiParam {Number} mobileNumber password of the user. (body params) 
     * @apiParam {string} [firstName] password of the user. (body params) (required)     * 
     * @apiParam {string} [latName] password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Successfully Created",
            "status": 200,
            "data": {
                "createdOn": "2018-07-21T06:24:52.000Z",
                "mobileNumber": 7896785674,
                "email": "trial00@gmail.com",
                "lastName": "Account",
                "firstName": "Trial",
                "userId": "AX89NnZ0g"
            }
        }
   */
 
    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
     * @apiGroup Read
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login Login.
     *
     * @apiParam {string} [email] email of the user. (body params) (required)
     * @apiParam {string} [password] password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Logged In Successfully",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkFreGw5TEVQRiIsImlhdCI6MTUzMjE1NDM1MjUwNSwiZXhwIjoxNTMyMjQwNzUyLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImVtYWlsIjoidHJpYWwwMEBnbWFpbC5jb20iLCJsYXN0TmFtZSI6IkFjY291bnQiLCJmaXJzdE5hbWUiOiJUcmlhbCIsInVzZXJJZCI6IkFYODlOblowZyJ9fQ.BClXwBjVCApZPc5ca6c7W2ApwT5vD93NrUC154adUcg",
                "userDetails": {
                    "email": "trial00@gmail.com",
                    "lastName": "Account",
                    "firstName": "Trial",
                    "userId": "AX89NnZ0g"
                }
            }
        }
    */

    app.post(`${baseUrl}/logout`,auth.isAuthorized, userController.logout);
    /**
     * @apiGroup Update
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout Logout.
     * 
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *@apiParam {string} [authToken] authToken of requesting user. (query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    // auth token params: userId.
    app.post(`${baseUrl}/delete/:userId`,auth.isAuthorized, userController.deleteUser);
    /**
     * @apiGroup Delete
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/delete/:usrId Delete user.
     * @apiDescription Deletes a user from database.
     * 
     * @apiParam {string} [userId] userId of the user. (auth headers) (required)
     *@apiParam {string} [authToken] authToken of requesting user. (query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User Deleted Successfully",
            "status": 200,
            "data": null

        }
    */

    app.route(`${baseUrl}/forgot-password`).get(userController.render_forgot_password_template).post(userController.forgotPassword);
    /**
     * @apiGroup Update
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgot-password Forgot password.
     *    
     * @apiParam {string} [email] email of the user. (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": true,
            "message": "Kindly check your email for further instructions",
            "status": 200,
            "data": null
        }
    */
    app.route(`${baseUrl}/reset-password`).get(userController.render_reset_password_template).post(userController.resetPassword);
    
    app.route(`${baseUrl}/send-invites`).get(userController.render_invite_to_room_template).post(userController.sendInvites);
       /**
     * @apiGroup Create
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/send-invites Room invites.
     * @apiDescription Sends Room Invite to multiple users.
     * 
     * @apiParam {string} [authToken] authToken of requesting user. (query params) (required)
     * @apiParam {string} [senderName] name of the user sending. (required)
     * @apiParam {string} [roomId] id of the room for inviting. (required)
     * @apiParam {Array} [members] name of the user sending. (required)
     * @apiParam {string} [roomName] name of the room for inviting. (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Invites sent!",
            "status": 200,
            "data": null
        }
    */
}
