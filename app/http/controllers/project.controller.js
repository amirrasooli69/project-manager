const { ProjectModel } = require("../../models/project");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const {title, text} = req.body;
            const owner = req.user._id;
            const result = await ProjectModel.create({title, text, owner});
            if(!result) throw({status: 400, message: "ساختن پروژه انجام نشد"})
            return res.status(201).json({
                status: 201,
                success: true,
                message: "پروژه ساخته شد"
            })
        } catch (error) {
            next(error)
        }
    } 
}

module.exports = {
    ProjectController: new ProjectController()
}