const mongoose = require('mongoose')
 
var detail = new mongoose.Schema({



text: {
        type: String,
         trim: true,
      },
   done:{
    type: String,
    trim: true,
   },
   date: { type: Date, default: Date.now },
   
     user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
})
 

 module.exports=mongoose.model('Detail', detail);
