import express from 'express'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser';


import md5 from 'md5';
import { name } from 'ejs';


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '\\public'));
app.use(bodyParser.urlencoded({ extended: true }));

var users = []
var usercredit = []
var count = 0;


app.get('/', function (req, res) {
        res.render('index.ejs', {
                'name': ' '
        })
})


app.post('/', function (req, res) {
        var a = req.body.fname
        var validuser = 0;

        for (let i = 0; i < count; i++) {
                if (a == users[i]['userid']) {
                        validuser = 1;
                }
        }
        if (validuser == 1) {
                console.log("valid user")
        }
        else {
                console.log("Invalid user")
        }

})

app.get('/register', function (req, res) {
        res.render('register.ejs')
})

count = 0;
app.post('/register', function (req, res) {

        count++

        var userid = req.body.userid
        var fname = req.body.fname
        var pass = (md5(req.body.pass))

        usercredit['userid'] = userid
        usercredit['name'] = fname
        usercredit['password'] = pass

        users.push(structuredClone(usercredit))

        for (let i = 0; i < count; i++) {
                console.log(users[i]['userid'])
        }


        res.render('register.ejs')
})

app.listen(2000, function (req, res) {
        console.log("Server started")
})