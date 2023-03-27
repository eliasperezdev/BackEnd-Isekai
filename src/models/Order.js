import sequelize from "sequelize";
import db from "../database/config.js";
import Category from "./Category.js";

const Order = db.define("Order", {
	voucherType: {
		type: sequelize.STRING,
		allowNull: false,
	},
	voucherSeries: {
		type: sequelize.STRING,
		allowNull: false,
	},
    receiptNumber: {
        type: sequelize.STRING,
        allowNull: false
    },    
    dateTime: {
        type: sequelize.DATE,
        allowNull: false
    },    
    tax: {
        type: sequelize.FLOAT,
        allowNull: false
    },    
    totalSale: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    // En proceso, Preparado, Entregado, enviado, no enviado
    status: {
        type: sequelize.STRING,
        allowNull: false
    }
});

export default Order;