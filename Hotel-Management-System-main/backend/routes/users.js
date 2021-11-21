const router = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library');
const config = require('config');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client("1076710447745-t2ul5fmtppd91ofiah29235n4vlugobv.apps.googleusercontent.com");

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) =>{
    const {username, email, password } = req.body;

    //Validation
    if(!username || !email || !password ) {
        return res.status(400).json('Please enter all fields' + err);
    }

    //Checking for data in DB
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json('Please enter all fields');

            const newUser = new User({username, email, password});
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user:{
                                        id: user.id,
                                        username: user.username,
                                        email: user.email
                                    }
                                });
                            }
                        )
                       })
                    .catch(err => res.status(400).json('Error: '+ err));
                })
            })
        }) 
});

router.route('/googlelogin').post((req, res) =>{
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, audience: "1076710447745-t2ul5fmtppd91ofiah29235n4vlugobv.apps.googleusercontent.com"})
    .then(() =>{
        const {email_verified, name , email} = response.payload;
        if(email_verified) {
            User.findOne({email}).exec((err, user) => {
                if(err) {
                    return res.status(400).json({
                        error: "Something went wrong..."
                    })
                } else {
                    if(user){
                        const token = jwt.sign({_id: user._id})
                    }
                }
            })
        }
    })

});
module.exports = router;