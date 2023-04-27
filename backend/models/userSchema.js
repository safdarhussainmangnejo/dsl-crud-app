const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// var localStorage = require('localStorage');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    about: {
        type: String
    },
    image: {
        type: String
    },
    
})
const UserModel = mongoose.model('user', userSchema);
// const insertData = async ()=>{
//   const data = await UserModel.create({
//       name:"Asad",
//       address:"Larkana",
//       phone:"03045",
//       about:"Im Asad from Larkana",
//       image:"image"
//   });
// }

// insertData();
module.exports = UserModel;
