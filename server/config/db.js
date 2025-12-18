const mongoose = require("mongoose");

// Initialize connection to MongoDB database
exports.connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (connectionInstance) {
            console.log("MongoDB connected successfully!");
        }
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};
