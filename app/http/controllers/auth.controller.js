class AuthController {
    register(req, res, next) {
        const {username, password, email, mobile} = req.body;
        return res.json(req.body);
    }

    login() {

    }

    resetPassword(){

    }
}

module.exports = {
    AuthController : new AuthController()
}