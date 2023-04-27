const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// var localStorage = require('localStorage');

const signupSchema = new mongoose.Schema({
    
    email: {
        type: String
    },
    password: {
        type: String
    }
    
    // tokens: [
    //     {
    //         token: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
})

// signupSchema.pre("save", async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 5);
//     }
//     next();

// })

// signupSchema.methods.generateAuthToken = async function () {
//     try {

//         let token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({ token:token})
//         await this.save();
//         return token;


//     } catch (err) {
//         console.log(err);
//     }
// }
 const SignupModel = mongoose.model('account', signupSchema);
// const insertData = async ()=>{
//   const data = await SignupModel.create({
//       email:"safdar@gmail.com",
//       password:"Naudero"
//   });
// }

// insertData();
module.exports =SignupModel;