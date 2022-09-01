const { UserModel } = require("../../models/user");

class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
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