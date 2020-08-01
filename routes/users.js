const router = require('express').Router();
const { validateUser } =require('../models/user');
const generateResponse = require('../libs/responseLib');
const userController = require('../controllers/userController');

router.post('/create', async (req,res)=>{
    const { error } = validateUser(req.body);

    if(error) return res.status(400).send(generateResponse(400,true,null,error.details[0].message));

    let response = await userController.createUser(req.body);

    if(response.status) return res.status(response.status).send(generateResponse(response.status,true,null,response.msg));

    res.send(generateResponse(200,false,response.user,response.msg));
});

module.exports = router;