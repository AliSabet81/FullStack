import{ Model } from "mongoose";

export const User = new Model ({
    usename : String,
    email : String,
    password : String,
    repeatPassword : String
})