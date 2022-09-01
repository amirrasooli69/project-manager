const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

function hashString(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt)
}

function tokenGenerator(payload){
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "365 days"});
    return token;
}

function verifyJwtToken(token){
    const result = jwt.verify(token, process.env.SECRET_KEY)
    if(!result?.username) throw {status: 401, message: "لطفا وارد حساب کاربری خود شوید"}
    return result;

}

function createUploadPath(){
    const d = new Date();
    const year = "" + d.getFullYear();
    const month = "" + d.getMonth();
    const day = "" + d.getDate();
    const uploadPath = path.join(__dirname, "..", ".." , "public", "upload", year, month, day);
    fs.mkdirSync(uploadPath, {recursive: true});
    return path.join("public", "upload", year, month, day)
}
module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken,
    createUploadPath
}