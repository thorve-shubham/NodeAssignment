const { User } = require('../models/user');

async function createUser(data){
    try{
        let user = new User(data);

        user = await user.save();
        if(user){
            return {
                error : false,
                user,
                msg : "Successfully Created"
            }
        }
        return {
            status : 400,
            error : true,
            msg : "Failed to create user"
        }
    }catch(err){
        console.log("----error---\n",err);
        return {
            status : 400,
            error : true,
            msg : err._message || "Failed to create user"
        }
    }
    
}

module.exports.createUser = createUser;