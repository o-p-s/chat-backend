    const mongoose = require('mongoose');
    const path = require('path');
    const async = require('async');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const passwordLib = require('./../libs/passwordLib')
const token=require('./../libs/tokenLib')
/* Models */
const UserModel = mongoose.model('User')
const AuthModel=mongoose.model('Auth')
const InviteModel=mongoose.model('Invite')

var  hbs = require('nodemailer-express-handlebars'),
  email = 'optrial01@gmail.com',
  pass =  'advanced4321'
  nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  service:'Gmail'||'gmail',
  secure:true,
  auth: {
    user: 'optrial01@gmail.com',
    pass: 'advanced4321'
  }
});

var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./app/templates/'),
    extName: '.html'
  };
  
  smtpTransport.use('compile', hbs(handlebarsOptions));

// start user signup function 
let signUpFunction = (req, res) => {
    let validateUserInput=()=>{
        return new Promise((resolve,reject)=>{
            if(req.body.email){
                if(!validateInput.Email(req.body.email)){
                    logger.error('Failed to validate Email','userController:findUser()',5)
                    let apiResponse=response.generate(false,'Email does not meet requirements',400,null)
                    reject(apiResponse)
                }else if(check.isEmpty(req.body.password)){
                    logger.error('Password is missing','userController:findUser()',5)
                    let apiResponse=response.generate(false,'Password is missing',400,null)
                    reject(apiResponse)            
                }else if(!validateInput.Password(req.body.password)){
                    logger.error('Failed to validate Password','userController:findUser()',5)
                    let apiResponse=response.generate(false,'Password does not meet requirements',400,null)
                    reject(apiResponse)
                }else{
                    resolve(req)
                }
            }
            else{
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end validateUserInput
    let createUser=()=>{
        return new Promise((resolve,reject)=>{
            UserModel.findOne({email:req.body.email}).exec((err,retrievedUserDetails)=>{
                if(err){
                    logger.error(err.message, 'userController: createUser', 10)
                    let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                    reject(apiResponse)
                }else if(check.isEmpty(retrievedUserDetails)){
                    let newUser= new UserModel({
                        userId: shortid.generate(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName || '',
                        email: req.body.email.toLowerCase(),
                        mobileNumber: req.body.mobileNumber,
                        password: passwordLib.hashpassword(req.body.password),
                        createdOn: time.now(),
                        rooms:req.body.rooms
                    })
                    newUser.save((err,newUser)=>{
                        if(err){
                            logger.error(err.message, 'userController: createUser', 10)
                            let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                            reject(apiResponse)
                        }else{
                            let newUserObj=newUser.toObject();
                            delete newUserObj.defaultAppRoom;
                            delete newUserObj.rooms;
                            delete newUserObj.reset_password_token
                            delete newUserObj.reset_password_expires
                            resolve(newUserObj)
                        }
                    })
                }else{
                    logger.error('User Already Exists','userControleer:createUser',10)
                    let apiResponse = response.generate(true, 'User Already Exists', 500, null)
                    reject(apiResponse)
                }
            })
        })
    } //end createUser
    validateUserInput(req,res)
    .then(createUser)
    .then((resolve)=>{
        delete resolve.password
        delete resolve._id
        delete resolve.__v
        let apiResponse=response.generate(false,'User Successfully Created',200,resolve);
        res.send(apiResponse);
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })

}
// end user signup function. 

// start of login function 
let loginFunction = (req, res) => {
    let findUser=()=>{
        return new Promise((resolve,reject)=>{
            if(req.body.email){
                if(!validateInput.Email(req.body.email)){
                    logger.error('Failed to validate Email','userController:findUser()',5)
                    let apiResponse=response.generate(false,'Email does not meet requirements',400,null)
                    reject(apiResponse)
                }else if(check.isEmpty(req.body.password)){
                    logger.error('Password is missing','userController:findUser()',5)
                    let apiResponse=response.generate(false,'Password is missing',400,null)
                    reject(apiResponse)            
                }else if(!validateInput.Password(req.body.password)){
                    logger.error('Failed to validate Password','userController:findUser()',5)
                    let apiResponse=response.generate(false,'Password does not meet requirements',400,null)
                    reject(apiResponse)
                }else{
                    UserModel.findOne({email:req.body.email})
                    .select('-mobileNumber -reset_password_token -reset_password_expires -rooms -defaultAppRoom')
                    .lean()
                    .exec((err,userDetails)=>{
                        if(err){
                            logger.error('Failed to retrieve User Data','userController:findUser()',10)
                            let apiResponse=response.generate(true,'Failed to retrieve User Data',500,null)
                            reject(apiResponse)
                        }
                        else if(check.isEmpty(userDetails)){
                            logger.error('User Details not found','userController:findUser()',7)
                            let apiResponse=response.generate(true,'User Not Found',404,null)
                            reject(apiResponse)
                        }else{
                            logger.info('User Found', 'userController: findUser()', 10)
                            resolve(userDetails)
                        }
                    })
                }
            }else{
                logger.error('User field missing during Login','userController:findUser()',7)
                let apiResponse=response.generate(true,'Email is missing',404,null)
                reject(apiResponse)
            }
        })
    } //end findUser
    let validatePassword=(retrievedUserDetails)=>{
        return new Promise((resolve,reject)=>{
            passwordLib.comparePassword(req.body.password,retrievedUserDetails.password,(err,isMatch)=>{
                if(err){
                    logger.error(err.message,'userController:validatePassword()',10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                }else if(isMatch){
                    let retrievedUserDetailsObj = retrievedUserDetails
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                }else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }//end validatePassword
    let generateToken=(userDetails)=>{
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error(err.message,'userController:generateToken()',10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    } //end generateToken
    let saveToken=(tokenDetails)=>{
        return new Promise((resolve,reject)=>{
            AuthModel.findOne({userId:tokenDetails.userId},(err,retrievedTokenDetails)=>{
                if(err){
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(retrievedTokenDetails)){
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }else{
                    retrievedTokenDetails.authToken=tokenDetails.token
                    retrievedTokenDetails.tokenSecret=tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {  
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    } //end saveToken
    
    findUser(req,res)
    .then(validatePassword)
    .then(generateToken)
    .then(saveToken)
    .then((resolve)=>{
        let apiResponse=response.generate(false,'User Logged In Successfully',200,resolve)
        res.status(200)
        res.send(apiResponse)
    }).catch((err)=>{
        console.log(err)
        res.status(err.status)
        res.send(err)
    })
}
// end of the login function.

// start get all user function 
let getAllUsers=(req,res)=>{
    UserModel.find()
    .select(' -__v -_id -password -reset_password_expires -reset_password_token')
    .lean()
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: getAllUsers', 10)
            let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: getAllUsers')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All User Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}
//end get all user function.

//start single user details
let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id -reset_password_expires -reset_password_token')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user

// start user logout function
let logout = (req, res) => {
    if(req.body.userId){
        AuthModel.findOneAndRemove({userId:req.body.userId},(err,result)=>{
            if(err){
                logger.error(err.message, 'user Controller: logout', 10)
                let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                res.send(apiResponse)
            }else if(check.isEmpty(result)){
                let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
                res.send(apiResponse)
            }else{
                let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
                res.send(apiResponse)
            }
        })
    }else{
        let apiResponse = response.generate(true, 'UserId not provided.', 400, null)
        res.send(apiResponse)
    }
} 
// end of the logout function.

// satrt user delete function
let deleteUser = (req, res) => {
    if(!check.isEmpty(req.params.userId)){
        UserModel.findOneAndRemove({ 'userId': req.params.userId }).exec((err, result) => {
            if (err) {
                logger.error(err.message, 'User Controller: deleteUser', 10)
                let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: deleteUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Deleted successfully', 200, result)
                res.send(apiResponse)
            }
        });// end user model find and remove
    }else{
        logger.error('User Id missing in params','userController:deleteUser()',7)
        let apiResponse=response.generate(true,'User Id Missing in request params',404,false)
        res.send(apiResponse)
    }
}
// end delete user function.

// satrt user edit function
let editUser = (req, res) => {
    if(!check.isEmpty(req.body.userId)){
        let options = req.body;
        UserModel.update({ 'userId': req.params.userId }, options).exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller:editUser', 10)
                let apiResponse = response.generate(true, 'Failed To edit user body', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: editUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User details edited', 200, result)
                res.send(apiResponse)
            }
        });// end user model update
    }else{
        logger.error('User Id missing in params','userController:deleteUser()',7)
        let apiResponse=response.generate(true,'User Id Missing in request body',404,false)
        res.send(apiResponse)
    }

}
// end user edit function.

// reset password function
let resetPassword = (req, res) =>{
    UserModel.findOne({
        reset_password_token: req.body.token,
        reset_password_expires: { $gt: Date.now()}
      }).exec(function(err, user) {
        if (!err && user) {
          if (req.body.newPassword === req.body.verifyPassword) {
            user.password = passwordLib.hashpassword(req.body.newPassword)
            user.reset_password_token = undefined;
            user.reset_password_expires = undefined;
            user.save(function(err) {
              if (err) {
                logger.error(err,'userController:resetPassword()',10)
                let apiResponse = response.generate(true, 'Failed To update user', 422, null)
                res.send(apiResponse);
                
              } else {
                var data = {
                  to: user.email,
                  from: email,
                  template: 'reset-password',
                  subject: 'Password Reset Confirmation',
                  context: {
                    name: user.firstName
                  }
                }
    
                smtpTransport.sendMail(data, function(err) {
                  if (!err) {
                    logger.info('Password reset Successful','userController:sendMail()',10)
                    let apiResponse = response.generate(true, 'Password reset!', 200, null)
                    return res.send(apiResponse);
                  } else {                
                    logger.error(err,'userController:sendMail()',10)
                    let apiResponse = response.generate(true, 'Failed To send Mail', 500, null)
                    return res.send(apiResponse);
                  }
                });
              }
            });
          } else {
            logger.error('Failed password mismatch','userController:UserSave()',10)
            let apiResponse = response.generate(true, 'Failed password mismatch', 422, null);
            return res.status(422).send(apiResponse);
          }
        } else {
            logger.error('Password reset token is invalid or has expired.','userController:UserFind()',10)
            let apiResponse = response.generate(true, 'Password reset token is invalid or has expired.', 400, null);
            return res.status(400).send(apiResponse);
        }
      });
}
// end user reset Password function.


let forgotPassword=(req,res)=>{
    async.waterfall([
        function(done) {
          UserModel.findOne({email: req.body.email})
          .select('-password -mobileNumber -reset_password_token -reset_password_expires -createdOn -rooms')
          .lean()
          .exec(function(err, user) {
            if (user) {
              done(err, user);
            } else {
                logger.error(err,'userController:forgotPassword()',10)
                let apiResponse = response.generate(true, 'Failed To find user', 422, null)
              res.send(apiResponse);
            }
          });
        },
        function(user, done) {
          // create the random token
          token.generateToken(user, (err, tokenDetails) => {
            if (err) {
                logger.error(err.message,'userController:forgotPassword()',10)
                let apiResponse = response.generate(true, 'Failed To Generate Token', 400, null)
                res.send(apiResponse)
            } else {
                done(err, user,tokenDetails.token)
            }
            })
        },
        function(user, token, done) {
          UserModel.findByIdAndUpdate({ _id: user._id }, 
            {reset_password_token: token,reset_password_expires: Date.now() + 86400000 },
            { new: true })
            .exec(function(err, new_user){
                if(err){
                    logger.error(err,'userController:updateUser()',10)
                    let apiResponse = response.generate(true, 'Failed To update user', 422, null)
                    res.send(apiResponse)
                }
                else
                done(err, token, new_user);
          });
        },
        function(token, user, done) {
          var data = {
            to: user.email,
            from: email,
            template: 'forgot-password',
            subject: 'Password RESET!',
            context: {
              url: 'http://localhost:4200/reset-password?token=' + token,
              name: user.firstName
            }
          };
    
          smtpTransport.sendMail(data, function(err) {
            if (!err) {
                logger.info('Password reset Successful','userController:sendMail()',10)
                let apiResponse = response.generate(true, 'Kindly check your email for further instructions', 200, null)
                return res.send(apiResponse);
            } else {
                logger.error(err.message,'userController:sendMail()',10)
                let apiResponse = response.generate(true, 'Failed To send Mail', 500, null)
                return res.send(apiResponse);
            }
          });
        }
      ], function(err) {
        logger.error(err.message,'userController:forgotMail()',10)
        let apiResponse = response.generate(true, 'Failed To forgot Password', 500, null)
        return res.status(422).send(apiResponse);
      });
}

let sendInvites=(req,res)=>{  
   // if(!check.isEmpty(req.body.members)){
       let findUsers=()=>{
        return new Promise((resolve,reject)=>{
            UserModel.find({
                userId:{$in:req.body.members.split(',')}
            })
            .select('-password -mobileNumber -reset_password_token -reset_password_expires -createdOn -rooms')
            .lean()
            .exec((err,users)=>{
                if(err){
                    logger.error('users were not found'+err,'userController:senInvites:findUser()',10)
                    reject(err)
                }
                else if(check.isEmpty(users)){
                    logger.error('empty list of users was found'+err,'userController:senInvites:findUser()',10)
                    reject(err)
                }else
                resolve(users)
            })
        })
       }
       let processAndSend=(users)=>{
           return new Promise((resolve,reject)=>{
               let generateToken=(user)=>{
                 return new Promise((resolve,reject)=>{
                     user.roomName=req.body.roomName;
                     user.roomId=req.body.roomId;
                    token.generateToken(user, (err, tokenDetails) => {
                            if (err) {
                                logger.error("failed to generate token"+err,'userController:sendInvites:generateToken()',10)
                                reject(response.generate(true,'error occurred',404,null))
                            } else if(check.isEmpty(tokenDetails)){
                                logger.error("failed to generate token.empty token received",'userController:sendInvites:generateToken()',10)
                                reject(response.generate(true,'empty token generated',404,null))
                            }else {
                                delete tokenDetails.tokenSecret;
                                tokenDetails.userId=user.userId;
                                tokenDetails.userName=user.firstName;
                                tokenDetails.userEmail=user.email;
                                logger.info('token generated successfully','userController:sendInvites:generateToken()',10);
                                resolve(tokenDetails);
                            }
                        }) //generate token end
                   })
               }
               let saveToken=(tokenDetails)=>{ 
                    return new Promise((resolve,reject)=>{//console.log('function called saving token'+tokenDetails);
                        let newInviteToken = new InviteModel({
                            userId: tokenDetails.userId,
                            userName:tokenDetails.userName,
                            userEmail:tokenDetails.userEmail,
                            senderId:req.body.senderId,
                            senderName:req.body.senderName,
                            roomId:req.body.roomId,
                            roomName:req.body.roomName,
                            inviteToken: tokenDetails.token,
                            tokenGenerationTime: time.now()
                        })
                        newInviteToken.save((err, newTokenDetails) => {
                            if (err) {
                                logger.error('failed to save token'+err, 'userController: sendInvite:saveToken()', 10)
                                reject(err)
                            } else if(check.isEmpty(newTokenDetails)) {
                                logger.info('empty token saving','userController:sendInvites:saveToken()',10)
                                reject(err) 
                            }else {
                                logger.info('token saved suceessfully','userController:sendInvites:saveToken()',10)
                                resolve(newTokenDetails) 
                            }
                        })                            
                    })
                } 
                let sendMail=(newTokenDetails)=>{
                        return new Promise((resolve,reject)=>{ 
                                var data = {
                                    to: newTokenDetails.userEmail,
                                    from: email,          //for testing using admin email, will replace when authenticated users register in app
                                    template: 'invite-to-room',
                                    subject: 'Room Invite!',
                                    context: {
                                        roomName:newTokenDetails.roomName,
                                        senderName:newTokenDetails.senderName,
                                        url: 'http://localhost:4200/chat?token=' + newTokenDetails.inviteToken,
                                        name: newTokenDetails.userName
                                    }
                                } 
                                smtpTransport.sendMail(data, function(err) { 
                                if (!err) {
                                    logger.info('Mail sent Successfully','userController:sendinvite:sendMail()',10);
                                    resolve({message:'success'})
                                } else {
                                    logger.error('Mail not sent successfully'+err,'userController:sendinvite:sendMail()',10)
                                    reject(err)
                                }
                                });
                        })
                }
                  
                try{    process();
                    async function process(){
                        for(let x of users){
                            await generateToken(x)
                            .then(saveToken)
                            .then(sendMail)
                            .then((resolve)=>{
                                logger.info('Invite sent'+resolve,'userController:sendInvites:chain()',10)
                            }).catch((err)=>{
                                logger.info('Invite not sent'+err,'userController:sendInvites:chain()',10)
                            })    
                        }
                        await logger.info('invited successfully','userController:sendInvites:processAndSend()',10);
                        await resolve({m:'true'})
                    }

                }catch(err){
                    logger.info('Not invited successfully','userController:sendInvites:processAndSend()',10)
                    reject(err)
                }
           })
       }
            
        findUsers(req,res)
        .then(processAndSend)
        .then((resolve)=>{console.log(resolve);
            let apiResponse=response.generate(false,'Invites sent!',200,null)
            res.status(200).send(apiResponse)
        }).catch((err)=>{
            let apiResponse=response.generate(true,'Invites not sent!',500,null)
            res.status(500).send(apiResponse)
        })
        
    //}// end of if statement to check if req.body.members is not empty
}

let render_forgot_password_template = function(req, res) {
    return res.sendFile('./../templates/forgot-password.html',{root: __dirname});
};

let render_reset_password_template = function(req, res) {
    return res.sendFile('./../templates/reset-password.html',{root: __dirname});
};
let render_invite_to_room_template = function(req, res) {
    return res.sendFile('./../templates/invite-to-room.html',{root: __dirname});
};
//end single user detials
module.exports = {
    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    editUser:editUser,
    deleteUser:deleteUser,
    forgotPassword:forgotPassword,
    getAllUsers:getAllUsers,
    getSingleUser:getSingleUser,
    resetPassword:resetPassword,
    render_forgot_password_template:render_forgot_password_template,
    render_reset_password_template:render_reset_password_template,
    render_invite_to_room_template:render_invite_to_room_template,
    sendInvites:sendInvites
}// end exports