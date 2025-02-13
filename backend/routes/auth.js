
import { login,signup } from "../controllers/auth.js";
import { Router } from "express";

const authrouter=Router();

authrouter.post('/signup',signup);
authrouter.post('/login',login);


export default authrouter;


