const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        // console.log('sssss')
        // console.log(token)
        const decode=jwt.verify(token,'thiisnice')
        // console.log(decode)
        const user = await User.findOne({_id:decode._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user =user
        next()
    } catch (e) {
        res.status(401).send({error:'Please authnicated'})
    }
}
module.exports=auth