import {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
    getRecommend
} from '../controllers/Product.controller.js';

import { Router } from 'express';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import validateToken from '../middlewares/authenticateToken.js';
import multer from 'multer';
const upload = multer({ dest: '../uploads' })

const routerProduct = Router();

routerProduct.get('/', getProducts);
routerProduct.get('/recommend/', getRecommend);
routerProduct.post('/',upload.single('file'),validateToken, verifyAdmin, addProduct)
routerProduct.get('/:idProduct', getProduct);
routerProduct.put('/:idProduct',validateToken, verifyAdmin, editProduct);
routerProduct.delete('/:idProduct',validateToken, verifyAdmin, deleteProduct);

export default routerProduct;