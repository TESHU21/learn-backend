import  mongoose  from "mongoose";

const uri = "mongodb+srv://teshu2124_db_user:VfiVmn5GbmlujL4u@cluster0.z4va28b.mongodb.net/?appName=Cluster0";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
    process.exit(0);
})
.catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
});

