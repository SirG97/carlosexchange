import express from 'express';
// Authentication routes
import Signup from '../controllers/auth/signup.js';
import Login from '../controllers/auth/login.js';
import isAuthenticated from '../controllers/auth/isAuthenticated.js';


const router = express.Router();

router.post('/signup', Signup)

router.post('/login', Login)

router.get('/private', isAuthenticated)

router.get('/public', (req, res, next) => {
    res.status(200).json({message: "This is the public route"})
})

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;