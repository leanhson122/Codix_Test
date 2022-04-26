const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());

const jsonParse = require('body-parser').json();
const filePath = path.join(__dirname, 'database/db.json');
const dbUser = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const users = dbUser?.users;

app.get('/all_users', (req,res) => {
    res.status(200).send({message:"OK", users: users});
});

app.post('/users/register', jsonParse, (req, res)=>{
    const isUserExist = users.filter(x=>x.nickName.toUpperCase() == req.body?.nickName.toUpperCase()).length > 0;
    if(!isUserExist) {
        users.push(req.body);
        res.status(200).send({message:"OK", currUser: req.body, users: users});
    }
    else{
        res.status(200).send({errorCode: 1001, message:"The nick name exist already", users: users});
    }
    
})

app.put('/user/update', jsonParse, (req, res)=>{
    console.log(req.body);
    const isSameNickName = req.body.nickName.toUpperCase() === req.body.oldNick.toUpperCase();
    const isNickNameExist = users.filter(x=>x.nickName.toUpperCase() == req.body?.nickName.toUpperCase()).length > 0;
    if(!isSameNickName) {
        //check nickName is unique
        if(!isNickNameExist)
        {
            const newusers = users.map(el => el.email == req.body?.email ? req.body : el);
            res.status(200).send({message:"OK", currUser: req.body, users: newusers});
        } 
        else
        {
            res.status(200).send({errorCode: 1001, message: "The nick name exist already"});
        }
    }
    else
    {
        const newusers = users.map(el => el.email == req.body?.email ? req.body : el);
        res.status(200).send({message:"OK", currUser: req.body, users: newusers});
        
    }
})

app.post('/authenticate', jsonParse, (req,res) => {
    const user = users.filter(x=>x.nickName?.toUpperCase() == req.body?.nickName.toUpperCase()
                           && x.password == req.body?.password);
    if(user.length >0) {
        res.status(200).send({message:"OK", currUser: user[0]});
    }
    else{
        res.status(200).send({errorCode: 4001, message:"the user does not exist"});
    }
});

app.listen(3000, () => console.log('Server is running'))