import bcrypt from  'bcryptjs'

import jwt from 'jsonwebtoken';

import User from '../../models/user.js';

const Login = (req, res, next) => {
    User.findOne({where:{
        email:req.body.email
        }
    }).then(dbUser =>{
        if(!dbUser){
            res.status(404).json({message: 'These credentials does not exist on our record'})
        }else{
            bcrypt.compare(req.body.password, dbUser.password, (err, isPasswordCorrect) => {
                if(err){
                    res.status(502).json({message: 'Error while checking password'});
                }else if(isPasswordCorrect){
                    const token = jwt.sign({email: req.body.email}, 'secret', {expiresIn: '1h'});
                    res.status(200).json({message: 'login successful', 'token': token});
                }else{
                    res.status(401).json({message: 'These credentials does not exist on our record'});
                }
            })
        }
    }).catch(err => {
        console.log('error '. err)
    });
}


export default Login