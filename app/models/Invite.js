const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const Invite = new Schema({
  userId: {
    type: String
  },
  userName:{
    type:String
  },
  userEmail:{
    type:String
  },
  senderId: {
    type: String
  },
  senderName: {
    type: String
  },
  roomId:{
    type:String
  },
  roomName:{
    type:String
  },
  tokenGenerationTime: {
    type: Date,
    default: time.now()
  },
  inviteToken: {
    type: String
  },
})

module.exports = mongoose.model('Invite', Invite)
