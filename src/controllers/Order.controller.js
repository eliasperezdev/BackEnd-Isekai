import Order from "../models/Order.js"
import OrderDetails from "../models/orderDetails.js";



// TODO - paginacion y filtros, ademas de traer solos los datos de la tabla
const getOrdens = async (req, res) => {
    const orders = await Order.findAll();
    if(orders.length > 0) {
        return res.status(200).json({orders})
    }
    return res.status(200).json("No hay ordenes")
}

// TODO - traer una orden
const getOrden = async (req, res) => {
    const idOrder = req.params
    try {
        const order = await Order.findOne({where: {id: idOrder}})
        return res.status(200).json(order)
    } catch (error) {
        console.log(error);
    }
}

const addOrder = async (req, res) => {
    const total = req.body.reduce(
        (accumulator, product) => accumulator + (product.price*product.quantify),
        0
      );
    const order = {
        // TODO - moemntaneamente rellenamos los valores pero hay que actualizar la base de datos que no sean valores obligatorios
        voucherType: "1",
        voucherSeries: "1",
        receiptNumber: "1",
        tax: 1,
        //----
        totalSale: total,
        dateTime: new Date(),
        status: "En proceso",
        UserId: req.userId
    }
    try {
        const newOrder = await Order.create(order)
        req.body.forEach(async product => {
            await OrderDetails.create(
                {
                    quantity: product.quantify,
                    price: product.price,
                    discount: product.descuento,
                    OrderId: newOrder.id,
                    ProductId: product.id
                }
            )
        })
        return res.status(200).json(newOrder)
    } catch (error) {
        console.log(error);
    }
    
}

//TODO - permitir que el vendedor lo cambie
const editOrder = async (req, res) => {
    const {idOrder} =  req.params

    const order = await Order.update(req.body, {where:{id: idOrder}})

    if(category[0]===0) {
        return res.status(403).json("No se pudo actualizar")
    } 
    const orderEdit = await Order.findAll({where: {id: idOrder}})

    try {
        return res.status(200).json(orderEdit)
    } catch (error) {
        console.log(error);
    }
}

//TODO - Pasarlo a cancelado
const deleteOrder = async (req, res) => {
    const {idOrder} =  req.params

    const order = await Order.findOne({where:{id: idOrder}})

    if(order === null) {
        return res.status(404).json("No hay ordenes")
    }

    try {
        await Order.destroy({where:{id:idOrder}})
        res.status(200).json("orden eliminada")
    } catch (error) {
        console.log(error);
    }
}

export {
    getOrdens,
    addOrder,
    editOrder,
    deleteOrder
}