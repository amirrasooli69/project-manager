module.exports = class Application {
    #express = require("express");
    #app = this.#express();
    constructor(PORT, DB_URL) {
        this.configDatabase(DB_URL)
        this.configApplication()
        this.createServer(PORT)
        this.createRoutes()
        this.errorHandler()
    }
    
    configApplication() {
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended: true}));
        this.#app.use(this.#express.static(path.join(_dirname, "..", "public")))
    }
    
    createServer(PORT){
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server Run > on http://localhost:${PORT}`)
        })
    }
    
    configDatabase(DB_URL) {
        const mongoos = require("mongoose");
        mongoos.connect(DB_URL, (error) => {
            if(error) throw error
            return console.log("Connect to DB successul...")
        })
    }

    errorHandler(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "صفحه یا آدرس مورد نظر یافت نشد"
            })
        })
        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "InternalServerError"
            return res.status(status).json({
                status,
                success: false,
                message
            })
        })
    }

    createRoutes(){
        this.#app.get("/", (req, res, next) => {
            return res.json({
                message: "this is a new Express application"
            })
        })
    }
}