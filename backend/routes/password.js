import { Router } from "express";
import Password from "../models/password.js";

const passrouter=Router();

passrouter.post("/passwords", async (req, res) => {
    try {
      const newPassword = await Password.create(req.body);
      res
        .status(201)
        .json({ message: "Password saved successfully", data: newPassword });
    } catch (error) {
      res.status(500).json({ error: "Error saving password" });
    }
  });


  
passrouter.get("/passwords", async (req, res) => {
    try {
      const passwords = await Password.find();
      res.json({ data: passwords });
    } catch (error) {
      res.status(500).json({ error: "Error fetching passwords" });
    }
  });
  
  passrouter.delete("/passwords/:id", async (req, res) => {
    try {
        const deletedPassword = await Password.findByIdAndDelete(req.params.id);
        if (!deletedPassword) {
            return res.status(404).json({ error: "Password not found" });  // ✅ Handle case where ID doesn't exist
        }
        res.json({ message: "Password deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting password" });
    }
});

  
  export default passrouter;
