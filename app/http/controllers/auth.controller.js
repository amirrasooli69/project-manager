const { validationResult } = require("express-validator");
const { UserModel } = require("../../models/user");
const { hashString, tokenGenerator } = require("../../modules/functions");
const bcrypt = require("bcrypt")

class AuthController {
    async register(req, res, next) {
        try {
            const {username, password, email, mobile} = req.body;
            const hash_password = hashString(password);
            const user = await UserModel.create({username, email, password: hash_password, mobile})
            .catch(err => {
                // console.log(JSON.stringify(err, null, 2))
                if(err?.code == 11000) throw {status: 400, message: "نام کاربری قبلا استفاده شده است"}
            })
            return res.json(user);
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const user = await UserModel.findOne({username});
            console.log(req.headers)
            if(!user) throw {status: 401, message: "نام کاربری یا رمز عبور صحیح نمیباشد"}
            const compareResult = bcrypt.compareSync(password, user.password)
            if(!compareResult) throw {status:401, message: "نام کاربری یا رمز عبور صحیح نمیباشد"}
            const token = tokenGenerator({username});
            user.token = token;
            await user.save();
            return res.status(200).json({
                status:200,
                success: true,
                message: "شما با موفقعیت وارد شدید",
                token
            })
            return res.json(req.body)
        } catch (error) {
            next(error)
        }
    }

    resetPassword(){

    }
}

module.exports = {
    AuthController : new AuthController()
}