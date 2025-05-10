const express = require("express");
const { getAllUsers,
    getAllContacts,
    deleteUserById,
    getUserById,
    updateUserById,
    deleteContactById,
    getAllAdminServices,
    createService,
    updateServiceById,
    deleteServiceById,
} = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminmiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router.route("/users").get(authMiddleware, adminmiddleware, getAllUsers);
router.route("/users/:id").get(authMiddleware, adminmiddleware, getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminmiddleware, updateUserById);
router.route("/users/delete/:id").get(authMiddleware, adminmiddleware, deleteUserById);

router.route("/contacts").get(authMiddleware, adminmiddleware, getAllContacts);
router.route("/contact/delete/:id").delete(authMiddleware, adminmiddleware, deleteContactById);


//services routes
router.route("/services").get(authMiddleware, adminmiddleware, getAllAdminServices);
router.route("/services").post(authMiddleware, adminmiddleware, createService);
router.route("/services/:id").patch(authMiddleware, adminmiddleware, updateServiceById);
router.route("/services/:id").delete(authMiddleware, adminmiddleware, deleteServiceById);


module.exports = router;