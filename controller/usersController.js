const express = require('express');
const userController = express.Router();
const cors = require('cors');
const { getAllUsers,getUserById, createUser, updateUser, deleteUser } = require('../queries/usersQueries');
// validations
// import { validateUser } from '../validations/userValidation';

//middleware
userController.use(express.json());
userController.use(cors());

// routes
userController.get('/',async (req, res) => {
    try {
        const allCurrentUsers = await getAllUsers()
        console.log("All Current Users:", allCurrentUsers);
        if (allCurrentUsers.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(allCurrentUsers);

    }catch(error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ error: "Failed to fetch all users." });
    }
    
})

userController.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const userById = getUserById(id)
        if(!userById) {
            return res.status(400).json({error: `No user found with ID: ${id}, Please try again!`})
        }
        return res.status(200).json({})

    } catch (error) {
        console.error(`Received an error: ${error}`)
        res.status(500).json({error: "Recieved an error retrieving User by that ID"})
    }
})

userController.post('/', (req,res)=>{
    if(!req.body) {
        return res.status(400).json({error:"Missing"})
    }
})


module.exports = userController;



