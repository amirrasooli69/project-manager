const { body } = require("express-validator")
const path = require("path");

function imageValidator() {
    return [
        body("image").custom((image, {req}) => {
            if(Object.keys(req.file).length == 0 ) throw "لطفا یک تصویر را انتخاب کنید"
            const ext = path.extname(req.file.originalname);
            const exts = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
            if(!exts.includes(ext)) throw "فرمت ارسال شده صحیح نمیباشد"
            const maxSize = 2 * 1024 * 1024;
            if(req.file.size > maxSize) throw "حجم فایل نمیتواند بیشتر از ۲ مگابایت باشد"
            return true
        })
    ]
}

module.exports = {
    imageValidator
}