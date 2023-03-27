import Category from "../models/Category.js"
import cloudinary from "../services/cloudinary.js";

const getCategories = async (req, res) => {
    const categories = await Category.findAll();
    if(categories.length > 0) {
        return res.status(200).json({categories})
    }
    return res.status(200).json("No hay categorias")
}

const addCategory = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const category = req.body
    category.urlImage= result.url
    try {
        const newCategory = await Category.create(req.body)
        return res.status(200).json(newCategory)
    } catch (error) {
        console.log(error);
    }
    
}

const editCategory = async (req, res) => {
    const {idCategory} =  req.params

    const category = await Category.update(req.body, {where:{id: idCategory}})

    if(category[0]===0) {
        return res.status(403).json("No se pudo actualizar")
    } 
    const categoryEdit = await Category.findAll({where: {id: idCategory}})

    try {
        return res.status(200).json(categoryEdit)
    } catch (error) {
        console.log(error);
    }
}

const deleteCategory = async (req, res) => {
    const {idCategory} =  req.params

    const category = await Category.findOne({where:{id: idCategory}})

    if(category === null) {
        return res.status(404).json("No hay categorias")
    }

    try {
        await Category.destroy({where:{id:idCategory}})
        res.status(200).json("Categoria eliminada")
    } catch (error) {
        console.log(error);
    }
}

export {
    getCategories,
    addCategory,
    editCategory,
    deleteCategory
}