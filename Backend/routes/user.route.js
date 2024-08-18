import express from 'express';
import {allUsers, login, logout, signup,check} from '../controller/user.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get("/allusers", allUsers);
router.get('/check',check);

export default router;