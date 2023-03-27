import Address from "../models/Address.js"

const getAddresses = async (req, res) => {

    //TODO - Traer params y filtrar por userId

    const addresses = await Address.findAll();
    if(addresses.length > 0) {
        return res.status(200).json({addresses})
    }
    return res.status(200).json("No hay Address")
}

const addAddress = async (req, res) => {

    //TODO agregar los ids de user

    try {
        const newAddress = await Address.create(req.body)
        return res.status(200).json(newAddress)
    } catch (error) {
        console.log(error);
    }
    
}

const deleteAddress = async (req, res) => {
    const {idAddress} =  req.params

    const address = await Address.findOne({where:{id: idAddress}})

    if(address === null) {
        return res.status(404).json("No hay favorito")
    }

    try {
        await Address.destroy({where:{id:idAddress}})
        res.status(200).json("favorito eliminada")
    } catch (error) {
        console.log(error);
    }
}

export {
    getAddresses,
    addAddress,
    deleteAddress
}