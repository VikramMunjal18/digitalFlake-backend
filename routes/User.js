// backend/routes/user.js
const express = require('express');;
const { deleteUser, getAllUsers, login, signup, updateUser } = require('../controllers/User');

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);

module.exports = userRouter;


// import express from 'express';
// import { deleteUser, getAllUsers, login, signup, updateUser } from '../controllers/user-controller';

// const userRouter = express.Router();

// userRouter.get("/",getAllUsers);
// userRouter.post("/signup",signup);
// userRouter.put("/:id",updateUser);
// userRouter.delete("/:id",deleteUser);
// userRouter.post("/login",login);

// export default userRouter;