import bcrypt from  'bcryptjs'

import jwt from 'jsonwebtoken';

import User from '../../models/user.js';

const Signup = (req, res, next) => {
    // Check if the user already exists
    User.findOne({where:{
        email:req.body.email
        }
    }).then(dbUser =>{
        if(dbUser){
            return res.status(500).json({message: 'Email already exists'})
        }else if(req.body.email && req.body.password){
            // Hash the password
            bcrypt.hash(req.body.password, 12, (err, isPasswordHashed)=>{
                if(err){
                    return res.status(500).json({message: 'Couldn\'nt hash the password'})
                }else if(isPasswordHashed){
                    return User.create(({
                        email: req.body.email,
                        password: isPasswordHashed
                    })).then(() => {
                        res.status(200).json({message: 'Account created successfully'})
                    }).catch(err => {
                        console.log(err)
                        res.status(502).json({message:'Error while creating user'});
                    });
                }
            });
        }else if(!req.body.email){
            return res.status(400).json({message: 'Email not provided'})
        }else if(!req.body.password){
            return res.status(400).json({message: 'Password not provided'})
        }

    }).catch(err => {
        console.log('error ', err)
    });
}

export default Signup;