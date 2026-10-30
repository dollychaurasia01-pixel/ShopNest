const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const sendEmail=require('../utils/sendEmail');
const { RiUserForbidLine } = require('react-icons/ri');

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, {expiresIn: '30d'});
}

//Register a new User
const registerUser = async(req,res) => {
   const {name,email,password} = req.body;

   try {
    const existingUser = await User.findOne({ email });

    if(existingUser){
        return res.status(400).json({
            message:'User already exist'

           

        });
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({ name,email,password:hashedPassword});

    console.log("USER SAVED IN DATABASE:", user);

   if(user) {
       const otp=Math.floor(100000 + Math.random() * 900000).toString();
        const message =`Welcome ${name} . OTP is : ${otp}`; 

       await sendEmail(email,'Welcome to shopNest-Your otp for registration is', message);

      res.status(201).json({
          _id: user._id,
         name:user.name,
           email:user.email,
           role: user.role,
            token: generateToken(user._id),
       });
   }
  }catch (error) {
   console.log("REGISTER ERROR:", error);

 res.status(500).json({
       message: "Server error",
       error: error.message
   });
}




};


//LOGIN USER

const loginUser = async(req,res)=> {
    const {email,password} =req.body;
    try{
        const user= await User.findOneAndUpdate({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                name: user.name,
                role:user.role,
                token:generateToken(user._id)
            });
        } else {
            res.status(400).json({message: 'Invalid email or password'});
        }
    } catch(error){
        res.status(500).json({message:'Server Error'});
    }
};


//GETUSERS

const getUsers =  async(req,res) => {
    try{
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch(error){
        res.status(500).json({message:'server error'});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers

};