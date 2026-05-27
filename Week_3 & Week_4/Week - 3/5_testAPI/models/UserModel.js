import {Schema,model} from 'mongoose'

const userSchema = new Schema({
    username:{
        type:String,
        minLength:[3,"Username should be of minimum size of 3"],
        required:[true,"Username is Required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    age:{
        type:Number,
        required:[true,"Age is required"],
        min:[18,"Age should be above 18"],
        max:[25,"Age should be less than 25"]
    },
    city:{
        type:String,
        minLength:[3,"min city length is 3"]
    }
    
},{
    strict:"throw",
    timestamps:true
})

// we create the model and export it so that we can directly use the model anywhere in our application
export const UserModel = model("user",userSchema)