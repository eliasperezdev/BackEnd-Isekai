import {
    getUsers,
    addUser,
    getSeller
} from '../controllers/User.controller.js';

import { Router } from 'express';
import validateToken from '../middlewares/authenticateToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const routerUser = Router();

routerUser.get('/',validateToken, verifyAdmin, getUsers);
routerUser.get('/seller',validateToken, verifyAdmin, getSeller);
routerUser.post('/', addUser)

export default routerUser;