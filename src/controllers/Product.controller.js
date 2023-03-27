import db from "../database/config.js";
import Category from "../models/Category.js";
import Editorial from "../models/Editorial.js";
import Product from "../models/Product.js"
import cloudinary from "../services/cloudinary.js";

//TODO - cambiar boolean recommned

const getProducts = async (req, res) => {

    //Agregar paginacion y filtrado y traer solos datos de la tabla

    const products = await Product.findAll();
    if(products.length > 0) {
        return res.status(200).json({products})
    }
    return res.status(200).json("No hay Productos")
}

//TODO - obtener un producto
const getProduct = async (req, res) => {
    const {idProduct} =  req.params

    const product = await Product.findOne({where:{id: idProduct}, 
        include: [Category, Editorial]})

    if(product === null) {
        return res.status(404).json("No existe el producto")
    }

    try {
        return res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

const getRecommend = async (req, res) => {
    const products = await Product.findAll({where:{recommend: 1},limit: 8, order:[db.random()]});
    if(products.length > 0) {
        return res.status(200).json({products})
    }
    return res.status(200).json("No hay Productos")
}


const addProduct = async (req, res) => {

    const result = await cloudinary.uploader.upload(req.file.path);

    const product = req.body
    product.urlImage = result.url

    try {
        const newProduct = await Product.create(req.body)
        return res.status(200).json(newProduct)
    } catch (error) {
        console.log(error);
    }
    
}

const editProduct = async (req, res) => {
    const {idProduct} =  req.params
    console.log(idProduct);

    const product = await Product.update(req.body, {where:{id: idProduct}})
    console.log(product);

    if(product[0]===0) {
        return res.status(403).json("No se pudo actualizar")
    } 
    const editProducts = await Product.findAll({where: {id: idProduct}})
    console.log(editProducts);
    return

    try {
        return res.status(200).json(editProducts)
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {
    const {idProduct} =  req.params

    const product = await Product.findOne({where:{id: idProduct}})

    if(product === null) {
        return res.status(404).json("No hay productes")
    }

    try {
        await Product.destroy({where:{id:idProduct}})
        res.status(200).json("product eliminada")
    } catch (error) {
        console.log(error);
    }
}

export {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
    getRecommend,
}