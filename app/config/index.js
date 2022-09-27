const config = {
    app: {
        port: process.env.port || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/ContactBook?retryWrites=true&w=majority"
        }
};
 module.exports =config;