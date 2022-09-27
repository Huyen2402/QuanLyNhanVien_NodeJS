// const app = require("./app");
// const config = require("./app/config");

// const port = config.app.port;
// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
// });

const app = require("./app.js");
const config = require("./app/config");
const MongoDB = require("./app/utils/monggodb.util.js");


async function startServer(){
    try{
        await MongoDB.connect(config.db.uri);
        console.log("Connect to the database");
        const port = config.app.port;
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(error){
        console.log("Can not connect to the database", error);
        process.exit();
    }
}
startServer();