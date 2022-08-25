const {body} = require("express-validator")
function registerValidator() {
    return [
        body("username").custom((value, ctx) => {
            if(value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_|.]{2,}/gi
                if(usernameRegex.test(value)) {
                return true
                }
                throw "نام کاربری صحیح نمیباشد"

            }
            throw "نام کاربری نمیتواند خالی باشد"
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمیباشد"),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل وارد شده صحیح نمیباشد"),
        body("password").isLength({min: 6, max: 16}).withMessage("رمز عبور حداقل 6 و حداکثر 16 نویسه باشد")
        .custom((value, ctx) => {
            if(!value) throw "رمز عبور نمیتواند خالی باشذ"
            if(value !== ctx?.req?.body.confirm_password) throw "رمز عبور با تکرار آن یکسان نیست"
            return true
        })
    ]
}

module.exports = {
    registerValidator 
}