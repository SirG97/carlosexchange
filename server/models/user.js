import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../utils/database.js";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
     },

     email: {
        type: DataTypes.STRING,
        allowNull: false,
     },

     first_name: {
        type: DataTypes.STRING,
        allowNull: true,
     },

     last_name: {
        type: DataTypes.STRING,
        allowNull: true,
     },

     password: {
        type: Sequelize.STRING,
        allowNull: false,
     },

     email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
     },

    remember_token: {
        type: DataTypes.STRING
    },
    
    phone: {
        type: DataTypes.STRING
    },

    dob: {
        type: DataTypes.STRING
    },

    bank: {
        type: DataTypes.STRING
    },

    bank_code: {
        type: DataTypes.STRING
    },

    account_number: {
        type: DataTypes.STRING
    },

    account_name: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: 'unverified'
    },

    id_type: {
        type: DataTypes.STRING
    },

    photo: {
        type: DataTypes.STRING
    },

    middle_name: {
        type: DataTypes.STRING
    },

    active: {
        type: DataTypes.BOOLEAN
    },

    referrer_id: {
        type: DataTypes.INTEGER
    },

    referral_id: {
        type: DataTypes.STRING
    },

    referral_bonus: {
        type: DataTypes.DOUBLE(20,2),
        defaultValue: 0.00
    },

    profile_photo: {
        type: DataTypes.STRING
    },

    createdAt: 'created_at',

    updatedAt: 'updated_at'
})

export default User