import  express  from "express";
import {login,signup} from '../controllers/auth.js';
import {getAllUsers,updateProfile} from '../controllers/users.js';
import auth from "../middleware/auth.js";
// get the router from the express
const router = express.Router();

// if request is signup the we all the conditions here
router.post('/signup', signup)

router.post('/login',login)

router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id', auth, updateProfile);

export default router;