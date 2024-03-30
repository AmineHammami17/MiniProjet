const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],

        },
        lastname:{
            type:String,
            required:[true,"lastname is required"],

        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:[true,'email must be unique'],
        },

        password:{
            type:String,
            required:[true,"password is required"],
            
        },
        phone:String,
        profileImg:String,
        CIN:{
            type:String,
            required:[true,"CIN is required"],
            unique:[true,"CIN must be unique"],

        },
        passwordChangedAt: Date,
        passwordResetCode: String,
        passwordResetExpires: Date,
        passwordResetVerified: Boolean,    
        role:{
            type:String,
            enum:['student','teacher',"superadmin","managerhr","manageruni","managerdocuments"],
            required:true,
        },
    }
)

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password,10);
    next();

});

const userModel = mongoose.model('User',userSchema);
module.exports=userModel;