import express from 'express'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '\\public'));
app.use(bodyParser.urlencoded({ extended: true }));


var users = []
var usercredit = []
var count = 0;
const saltRounds = 10;






app.get('/', function (req, res) {
        res.render('index.ejs', {
                'name': ' '
        })
})


app.post('/', function (req, res) {
        var a = req.body.fname
        var b = req.body.password
        var validuser = 0;
        var position;

        for (let i = 0; i < count; i++) {
                if (a == users[i]['userid']) {
                        validuser = 1;
                        position = i;
                }
        }
        if (validuser == 1) {
                bcrypt.compare(b, users[position]['password'], function (err, result) {
                        if (result) {
                                console.log("Login Successful")
                        }
                        else {
                                console.log("Incorrect password");
                        }
                });
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

        bcrypt.hash(req.body.pass, saltRounds, function (err, hash) {
                usercredit['userid'] = userid
                usercredit['name'] = fname
                usercredit['password'] = hash

                users.push(structuredClone(usercredit))
                console.log(users)
        });

        res.render('register.ejs')
})


app.listen(2000, function (req, res) {
        console.log("Server started")
})