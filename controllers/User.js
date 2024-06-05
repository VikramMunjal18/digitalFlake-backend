const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//--------------------------------------------------------------------------------------------------------------------
const getAllUsers = async (req,res,next)=>{
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }
    if(!users){
        return res.status(500).json({message:"Unexpected Error Occured"});
    }
    return res.status(200).json({users});
}
//--------------------------------------------------------------------------------------------------------------------
const signup= async(req,res,next)=>{
    console.log("req.body",req.body);
    const {email,password,name} = req.body;
    
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = User.create({email,password:hashedPassword,name});
    } catch (err) {
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message:"Unexpected Error Occured"});
    }
    return res.status(201).json({user});
};

//----------------------------------------------------------------------------------------------------------------

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {  email, password } = req.body;
    if (
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    
    let user;
    try {
      user = await User.findByIdAndUpdate(id, {
        email,
        password: hashedPassword,
    });
} catch (errr) {
    return console.log(errr);
}

if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
}
res.status(200).json({ message: "Updated Sucessfully" });
};

//----------------------------------------------------------------------------------------------------------------


const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Deleted Successfully" });
};

//----------------------------------------------------------------------------------------------------------------

const login = async (req, res, next) => {
    const { email, password } = req.body;

    console.log("req.body",req.body);

    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }

    if (!existingUser) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        process.env.SECRET_KEY, // Replace with your secret
        { expiresIn: '1h' }
    );

    return res.status(200).json({ token, name: existingUser.name, email: existingUser.email });
};



module.exports = {
    getAllUsers,
    signup,
    updateUser,
    deleteUser,
    login
  }