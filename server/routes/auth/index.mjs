import { Router } from "express";
import { User } from "./../../models/index.mjs";

export const AuthRoutes = Router();

AuthRoutes.post('/register', async(req,res)=>{
    if (!req.body.username) return res.status(400).json({
        msg:'username is required'
    })

    const isUser = User.findOne({email:req.body.email})
    if (isUser) return res.status(400).json({
        msg:'username with this email alredy exists!'
    })

    const user = await new User({...req.body})
    await user.save()
    res.status(201).json({
        msg:"user created successfully"
    })
})
