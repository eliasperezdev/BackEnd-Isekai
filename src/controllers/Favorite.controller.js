import Favorite from "../models/Favorite.js"

const getFavorities = async (req, res) => {

    //TODO - Traer params y filtrar por userId

    const favorities = await Favorite.findAll();
    if(favorities.length > 0) {
        return res.status(200).json({favorities})
    }
    return res.status(200).json("No hay editoriales")
}

const addFavorite = async (req, res) => {

    //TODO agregar los ids de user y product

    const editorial = req.body

    try {
        const newFavorite = await Favorite.create(req.body)
        return res.status(200).json(newFavorite)
    } catch (error) {
        console.log(error);
    }
    
}

const deleteFavorite = async (req, res) => {
    const {idFavorite} =  req.params

    const favorite = await Favorite.findOne({where:{id: idFavorite}})

    if(favorite === null) {
        return res.status(404).json("No hay favorito")
    }

    try {
        await Favorite.destroy({where:{id:idFavorite}})
        res.status(200).json("favorito eliminada")
    } catch (error) {
        console.log(error);
    }
}

export {
    getFavorities,
    addFavorite,
    deleteFavorite
}