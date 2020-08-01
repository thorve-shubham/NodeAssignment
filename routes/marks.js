const router = require('express').Router();
const { validateMarks } =require('../models/mark');
const generateResponse = require('../libs/responseLib');
const markController = require('../controllers/markController');

router.post('/add', async (req,res)=>{
    const { error } = validateMarks(req.body);

    if(error) return res.status(400).send(generateResponse(400,true,null,error.details[0].message));

    let response = await markController.addMarks(req.body);

    if(response.status) return res.status(response.status).send(generateResponse(response.status,true,null,response.msg));

    res.send(generateResponse(200,false,response.user,response.msg));
});

router.get('/getToppers', async (req,res)=>{

    let response = await markController.getToppers2();

    if(response.status) return res.status(response.status).send(generateResponse(response.status,true,null,response.msg));

    res.send(generateResponse(200,false,response.toppers,response.msg));
});

module.exports = router;