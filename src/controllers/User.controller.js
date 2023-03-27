import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Role from "../models/Role.js";

//TODO - paginacion
const getUsers = async (req, res) => {
    const users = await User.findAll();
    if(users.length > 0) {
        return res.status(200).json({users})
    }
    return res.status(500).json("No hay usuarios")
}

const getSeller = async (req, res) => {
    const users = await User.findAll({where: {RoleId: 1}});
    if(users.length > 0) {
        return res.status(200).json({users})
    }
    return res.status(500).json("No hay usuarios")
}

const updateRole = async (req, res) => {
    const users = await User.findAll({where: {RoleId: req.params.id}});
    if(users.length > 0) {
        return res.status(200).json({users})
    }
    return res.status(200).json("No hay usuarios")
}

const addUser = async (req, res) => {
    let user = await User.findOne({where:{email:req.body.email}})
    if(user) {
        return res.status(400).json("El usuario ya existe")
    }
    const role = await Role.findOne({where: {name: "Cliente"}});
    req.body.RoleId=role.id
    user = User.build(req.body)
    //Hasear
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    try {
        const newUser = await user.save()
        return res.status(200).json(newUser)
    } catch (error) {
        console.log(error);
    }
}

export {
    getUsers,
    addUser,
    getSeller
}