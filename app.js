import express from 'express'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser';


import md5 from 'md5';
import { name } from 'ejs';


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname+ '\\public'));
app.use(bodyParser.urlencoded({ extended: true }));

var users = []

app.get('/', function (req, res) {
        res.render('index.ejs',{
                'name' : ' '
        })
      })


app.post('/',function(req,res){
        var a = req.body.fname
        var b = "8aae3a73a9a43ee6b04dfd986fe9d136"
 if((md5(a))==b){
        res.render('index.ejs',{
                'name':"login successfully"
        })
}
else{
        res.render('index.ejs',{
                'name':"login unsuccessfully"
        })
}
})

app.get('/register', function (req, res) {
        res.render('register.ejs',{
                // 'name' : ' '
        })
      })

app.post('/register',function(req,res){
        users.push(req.body)
        res.render('register.ejs')
        console.log(users)
})

app.listen(2000,function(req,res){
        console.log("Server started")
})