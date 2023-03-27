import express from "express"
import db from "./database/config.js"
import Address from "./models/Address.js";
import Category from "./models/Category.js";
import Editorial from "./models/Editorial.js";
import Favorite from "./models/Favorite.js";
import Order from "./models/Order.js";
import OrderDetails from "./models/orderDetails.js";
import Product from "./models/Product.js";
import Role from "./models/Role.js";
import User from "./models/User.js";
import "./models/asociations.js"
import dotenv from 'dotenv'
import routerEditorial from "./routes/editorial.route.js";
import routerCategory from "./routes/category.route.js";
import routerProduct from "./routes/product.route.js";
import routerUser from "./routes/user.route.js";
import routerAuth from "./routes/auth.route.js";
import cors from 'cors'
import routerOrder from "./routes/order.route.js";

const app = express()
app.use(express.json())
dotenv.config()

const corsOption = {
    origin: process.env.FRONTEND_URL
}
app.use(cors())

//routes
app.use('/api/editorials', routerEditorial);
app.use('/api/categories', routerCategory);
app.use('/api/products', routerProduct);
app.use('/api/users', routerUser);
app.use('/api/login', routerAuth);
app.use('/api/orders', routerOrder);

const PORT = process.env.PORT || 4000

db.sync({ force: false })
    .then(()=>console.log("Base de datos conectada"))
    .catch((error) => console.log(error))

app.listen(PORT,  ()=> {
    console.log(`Servidor corriendo en ${PORT}`);
})
