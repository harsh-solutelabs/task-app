const jwt = require('jsonwebtoken')
const myFuncion = async()=>{
    const token = jwt.sign({_id:'abc123'},'thisisnicecourse',{expiresIn:'7 days'})
    console.log(token)


    const verify = jwt.verify(token,'thisisnicecourse')
    console.log(verify)
}
myFuncion()