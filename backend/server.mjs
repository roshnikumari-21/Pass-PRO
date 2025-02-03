
import express from "express";  
import mongoose from "mongoose";  
import cors from "cors";  

const app = express();  
const PORT = 3000;  
//const mongoURI = "mongodb://127.0.0.1:27017/passwordManager";  
const mongoURI = process.env.MONGO_URI;  

app.use(cors());  
app.use(express.json()); 


mongoose.connect(mongoURI)  
  .then(() => console.log("Connected to MongoDB"))  
  .catch(err => console.error("MongoDB connection error:", err));  


const passwordSchema = new mongoose.Schema({  
  site: { type: String, required: true },  
  username: { type: String, required: true },  
  password: { type: String, required: true }  
});  

const Password = mongoose.model("Password", passwordSchema);  


app.post("/api/passwords", async (req, res) => {  
  try {  
    const { site, username, password } = req.body;  

    if (!site || !username || !password) {  
      return res.status(400).json({ error: "All fields are required" });  
    }  

    const newPassword = new Password({ site, username, password });  
    await newPassword.save();  

    res.status(201).json({ message: "Password saved successfully", data: newPassword });  
  } catch (error) {  
    console.error("Error saving password:", error);  
    res.status(500).json({ error: "Internal server error" });  
  }  
});  

 
app.get("/api/passwords", async (req, res) => {  
  try {  
    const passwords = await Password.find();  
    res.json(passwords);  
  } catch (error) {  
    console.error("Error fetching passwords:", error);  
    res.status(500).json({ error: "Error fetching passwords" });  
  }  
});  


app.delete("/api/passwords/:id", async (req, res) => {  
  try {  
    const id = req.params.id;  

    if (!mongoose.Types.ObjectId.isValid(id)) {  
      return res.status(400).json({ error: "Invalid ID format" });  
    }  

    const deletedPassword = await Password.findByIdAndDelete(id);  

    if (!deletedPassword) {  
      return res.status(404).json({ error: "Password not found" });  
    }  

    res.json({ message: "Password deleted successfully" });  
  } catch (error) {  
    console.error("Error deleting password:", error);  
    res.status(500).json({ error: "Error deleting password" });  
  }  
});  


app.listen(PORT, () => {  
  console.log(`Server running on http://localhost:${PORT}`);  
});