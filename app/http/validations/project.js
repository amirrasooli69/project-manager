const { body } = require("express-validator");

function createProjectValidator() {
    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("text").notEmpty().isLength({min: 20}).withMessage("توضیحات باید حداقل ۲۰ کاراکتر باشد")
    ]
}

module.exports = {
    createProjectValidator
}