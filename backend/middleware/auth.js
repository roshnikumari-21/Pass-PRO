import jwt from "jsonwebtoken";


const ensure=   async ( req,res,next  )=>{

   

    const auth=req.headers['authorization'];
    const token = auth.split(" ")[1];
    if(!token){
        return res.status(400).json({mssg:"nooo"});
    }
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
    } catch (error) {

        res.status(500).json({mssg:"internal sersver error"});
        
    }
        next();
}

export default ensure;