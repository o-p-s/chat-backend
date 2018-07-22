/**
 * module dependencies
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

let chatRoomSchema = new Schema({    
    roomId: { type: String, unique: true, required: true },
    roomName:{type:String,default:''},
    createdOn: { type: Date, default: Date.now },
    creatorName: { type: String, default: '' },
    creatorId: { type: String, default: '' },
    members: [],                                                //userIds
    modifiedOn: { type: Date, default: Date.now },
    state:{ type: String, default: '' }
})

mongoose.model('ChatRoom', chatRoomSchema)
