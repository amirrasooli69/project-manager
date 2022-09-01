const router = require("express").Router();
const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin")

router.get('/profile', checkLogin, UserController.getProfile)
router.post("/profile", checkLogin, UserController.editProfile)

module.exports = {
    userRoutes: router
}