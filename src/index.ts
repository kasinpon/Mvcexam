import "reflect-metadata";
import * as express from 'express'
let server = express()
let bodyParser = require("body-parser")
// import routeV1 from './api/v1/route'
// import app from "./api/v1/route/practiceVideo";
import {createConnection,getConnection} from "typeorm";
import {Student} from "./entity/Student";
createConnection().then(async connection => {
    const cors = require('cors');

    const PORT =  2000;
    /* Fixed none Authorization CORS*/
    server.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,accesstoken");
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    server.use(cors());
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({extended: false}))

    /* Fixed none Authorization CORS*/

    server.get('/',(req, res)=>{
        res.send("Access denieddddddddddd!")
    })

    server.post('/register',async (req, res)=>{
        let studentid = req.body.studentid
        let password = req.body.password
        let datastudent = new Student()
        datastudent.studentid = studentid,
            datastudent.password = password,
            datastudent.total = 1
        await getConnection().getRepository(Student).save(datastudent)
        res.send("create success")
    })

    server.post('/login',async (req, res)=>{
        let memberRepo = getConnection().getRepository(Student)
        let findUser = await memberRepo.findOne({
            studentid: req.body.studentid,
            password : req.body.password
            // : req.body.password
        })
        if (findUser == undefined){
            res.send("สมัครสมาชิกก่อน")
        }else {
            let totalupdate = await memberRepo.findOne({studentid : req.body.studentid});
            totalupdate.total = totalupdate.total+1;
            await memberRepo.save(totalupdate);
            res.send("loginsuccess")
        }
    })
    // server.use('/api/v1',routeV1)

    server.listen(PORT, () => {
        console.log('Server running:' + PORT);
    })
})