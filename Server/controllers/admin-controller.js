const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require('../models/service-model');
//..................
//Geting User
//..................
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No user Found" });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

//..................
//Geting Contact 
//..................
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No user Found" });
        }
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

//edit user from admin users
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 })
        return res.status(200).json(data);
    } catch (error) {
        next(error)
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.findByIdAndUpdate(
            id,
            { $set: updateUserData },
            { new: true, select: "-password" }
        );
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};


//deleting user from admin users
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id })
        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        next(error)
    }
}


//deleting contact from admin contact
const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};


//...Services code for backend(performing crud)....


const getAllAdminServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        next(err);
    }
};

const createService = async (req, res, next) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json({ message: "Service created", newService });
    } catch (err) {
        next(err);
    }
};

const updateServiceById = async (req, res, next) => {
    try {
        const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

const deleteServiceById = async (req, res, next) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        next(err);
    }
};





module.exports = {
    getAllUsers,
    getAllContacts,
    deleteUserById,
    getUserById,
    updateUserById,
    deleteContactById,
    getAllAdminServices,
    createService,
    updateServiceById,
    deleteServiceById
};