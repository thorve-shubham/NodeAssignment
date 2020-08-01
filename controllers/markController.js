const { Mark } = require('../models/mark');
const { User } = require('../models/user');

async function addMarks(data){
    try{

        let user = await User.findById(data.userId);

        if(user){
            delete data.userId;
            data.user = user;
            data.total = data.science + data.maths + data.english;
            let mark = new Mark(data);

            mark = await mark.save();

            if(user){
                return {
                    error : false,
                    mark,
                    msg : "Successfully Added Marks"
                }
            }
            return {
                status : 400,
                error : true,
                msg : "Failed to Add marks"
            }
        } 
        return {
            status : 400,
            error : true,
            msg : "No User Found"
        }
    }catch(err){
        console.log("----error---\n",err._message);
        return {
            status : 400,
            error : true,
            msg : err._message || "Failed to add marks"
        }
    }
    
}

async function getToppers(){
    try{
        let toppers = await Mark.aggregate([{
            $addfields : {
                totalScore : {
                    $add : ["$maths","$science","$english"]
                }
            }
        }]).sort({ totalScore : -1}).limit(10);

        if(toppers){
            return {
                error : false,
                toppers,
                msg : "Got toppers"
            }
        }
        return {
            status : 400,
            error : true,
            msg : "No toppers Found"
        }
    }catch(err){
        console.log("----error---\n",err);
        return {
            status : 400,
            error : true,
            msg : err._message || "Failed to fetch toppers"
        }
    }
}

async function getToppers2(){
    try{
        let toppers = await Mark.find().sort({ total : -1}).limit(10);

        if(toppers){
            return {
                error : false,
                toppers,
                msg : "Got toppers"
            }
        }
        return {
            status : 400,
            error : true,
            msg : "No toppers Found"
        }
    }catch(err){
        console.log("----error---\n",err);
        return {
            status : 400,
            error : true,
            msg : err._message || "Failed to fetch toppers"
        }
    }
}

module.exports.addMarks = addMarks;
module.exports.getToppers = getToppers;
module.exports.getToppers2 = getToppers2;