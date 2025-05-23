const express = require('express');
const userController = express.Router();
const cors = require('cors');
const { 
    getAllUsers,
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../queries/usersQueries');
const {AuthenticateToken} = require('../validations/logRequests')
const jwt = require('jsonwebtoken');

// validations
// import { validateUser } from '../validations/userValidation';

//middleware
userController.use(express.json());
userController.use(cors());

// routes
// ! Testing purposes remove later
userController.get('/',async (req, res) => {
    try {
        const allCurrentUsers = await getAllUsers()
        if (allCurrentUsers.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(allCurrentUsers);

    }catch(error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ error: "Failed to fetch all users." });
    }
    
})

userController.get('/:id', AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        console.log('What is this: ',req.user.id);
        if (req.user.id !== id) {
            return res.status(403).json({ error: "Unauthorized User" });
          }
        const userById = await getUserById(id);
          console.log(userById)
        if (!userById || userById.length === 0) {
            return res.status(404).json({ error: `No user found with ID: ${id}.` });
        }

        return res.status(200).json(userById);
    } catch (error) {
        console.error(`Received an error: ${error}`);
        res.status(500).json({ error: "Error retrieving user by ID" });
    }
});

userController.post('/', async (req, res) => {
    try {
        const addingUser = await createUser(req.body);
    
        const token = jwt.sign(
          { id: addingUser.id },
          process.env.JWT_SECRET,
          { expiresIn: "30m" }
        );
    
        return res.status(201).json({
          message: "User created successfully",
          token,
          user: {
            id: addingUser.id,
            username: addingUser.username,
            email: addingUser.email,
          }
        });
        
      }catch (error) {
        console.error("Line-51 Received an Error: ", error);
        return res.status(500).json({ error: "Unable to process information!" });
    }
});

userController.put('/:id',AuthenticateToken, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Missing user ID in request!" });
    }
    if (req.user.id !== id) {
        return res.status(403).json({ error: "Unauthorized Userrr" });
      }


    try {
        const updatedUser = await updateUser(id, req.body);
        return res.status(200).json(updatedUser);
    } catch (error) { 
        console.error("Update error:", error);
        return res.status(500).json({ error: `Error updating user: ${error.message}` });
    }
});

userController.delete('/:id',AuthenticateToken, async (req,res) => {
    const { id } = req.params

    try{
        const removingUser =  await deleteUser(id)
        return res.status(200).json(removingUser)
    }catch(error){
        res.status(500).json({error: "error deleting User!"})
    }
})

module.exports = userController;



