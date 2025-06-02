const express = require('express');
const router = express.Router();
const authController = require('../controllers/usercontroller')
const userModal = require("../models/Auth")

router.route('/getusers').get(authController.getAllUsers)
router.route('/isadmin/:id').patch(authController.editUser);
// router.patch('/toggleadmin/:id', authController.toggleAdmin);
router.patch("/toggleadmin/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { isAdmin } = req.body;

    console.log("Toggle Admin Called");
    console.log("ID:", userId);
    console.log("Payload isAdmin:", isAdmin);

    if (typeof isAdmin !== "boolean") {
      return res.status(400).json({ message: "isAdmin must be boolean" });
    }

    const updatedUser = await userModal.findByIdAndUpdate(
      userId,
      { isAdmin: isAdmin },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: `User is now ${isAdmin ? "Admin" : "Normal User"}`,
      user: updatedUser,
    });
  } catch (err) {
    console.error("ERROR in toggleadmin:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route('/register').post(authController.registerUsers)
router.route('/login').post(authController.loginUsers)


module.exports = router;