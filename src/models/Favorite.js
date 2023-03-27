import sequelize from "sequelize";
import db from "../database/config.js";
import Product from "./Product.js";
import User from "./User.js";

const Favorite = db.define("Favorite", {
    date: {
        type: sequelize.INTEGER,
      }
});

export default Favorite;