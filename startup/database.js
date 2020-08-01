const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(process.env.mongoUrl)
        .then(()=> console.log("Successfully Connected To DB"))
        .catch((error)=> console.log("---error---\n",error));
}