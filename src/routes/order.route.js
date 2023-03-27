import {
    addOrder
} from '../controllers/Order.controller.js';

import { Router } from 'express';
import validateToken from '../middlewares/authenticateToken.js';
import multer from 'multer';
const upload = multer({ dest: '../uploads' })

const routerOrder = Router();

routerOrder.post('/',validateToken, addOrder)

export default routerOrder;