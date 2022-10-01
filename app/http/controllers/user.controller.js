const { UserModel } = require("../../models/user");

class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            // user.profile_image.replace(/[\\\\]/,"/") change address file when read file with regx
            user.profile_image = req.protocol + "://" + req.get("host") + "/" + user.profile_image.replace(/[\\\\]/,"/");
            return res.status(200).json({
                status: 200,
                success: true,
                user
            })
        } catch (error) {
            next(error)
        }
    }

    async editProfile(req, res, next){
        try {
            const data = {...req.body};
            const userID = req.user._id;
            const fields = ["first_name", "last_name", "skills"];
            const badValues = [""," ", null, undefined, NaN, [], {}];
            Object.entries(data).forEach(([key, value]) => {            
                if(!fields.includes(key)) delete data[key]
                if(badValues.includes(value)) delete data[key]

            })
            console.log(data);
            const result = await UserModel.updateOne({_id: userID}, {$set: data});
            if(result.modifiedCount > 0){
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "به روز رسانی با موفقعیت انجام شد"
                })
            }
            throw {status: 400, message: "به روز رسانی انجام نشد"}
        } catch (error) {
            next(error)
        }
    }

    async uploadProfileImage(req, res, next){
        try {
            const userID = req.user._id;
            if(Object.keys(req.file) == 0 ) throw({status: 400, success: false, message: "لطفا فایلی بارگزاری کنید"})
            // change address file when save file
            // const filePath = req.file?.path.replace("\\","/").substring(7);
            const filePath = req.file?.path.substring(7);
            const result = await UserModel.updateOne({_id: userID}, {$set: {profile_image: filePath}});
            if(result.modifiedCount == 0) throw({status: 400, message: "به روزرسانی انجام نشد"})
            // console.log(req.file)
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به روزرسانی انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }

    addSkills(){

    }

    editSkills(){

    }

    acceptInvitInTeam(){

    }

    rejectInviteInTeam(){

    }
}

module.exports = {
    UserController: new UserController()
}