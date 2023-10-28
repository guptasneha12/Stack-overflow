
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import users from '../models/auth.js';



// signup function
export const signup=async(req,res)=>{
const {name,email,password}=req.body;     // inside the body we write name, password and email
try{
   const existinguser = await users.findOne({email});     // if that email is already exist in users database then we store it in a variable
   if(existinguser){
    return res.status(404).json({message:"User already Exists."})
   }
   const hashedPassword=await bcrypt.hash(password,12)
   const newUser=await users.create({name,email,password:hashedPassword})
  
  // now we generate token for authentication
   const token=jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
   res.status(200).json({result:newUser,token})

}
catch(error){
res.status(500).json("Something went wrong...")
}

}




// login function
export const login=async(req,res)=>{
    const {email,password}=req.body;
try{

    const existinguser = await users.findOne({email});
    if(!existinguser){
        return res.status(404).json({message:"User don't Exists."})
       }

       const isPasswordCrt=await bcrypt.compare(password,existinguser.password)      // compare with the existing password of user
       if(!isPasswordCrt){
        return res.status(404).json({message:"Invalid credentials."})     // when password is incorrect the return this message

       }

       // if password is correct then generate the token
       const token=jwt.sign({email:existinguser.email,id:existinguser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
       res.status(200).json({result:existinguser,token})


}
catch(error){
    res.status(500).json("Something went wrong...")
}


    
}