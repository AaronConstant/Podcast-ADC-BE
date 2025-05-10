const { user } = require('elevenlabs/api');
const {db} = require('../db/dbConfig')

const getAllUsers = async (req, res) => {
    try {
        const users = await db.any('SELECT * FROM users');
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users." });
    }
}
const getUserById = async (req, res) => {
    const {id} = req.params;
    try{
        const userById = await db.one("SELECT * FROM users WHERE id=$1", id);
        return userById;
    } catch (error) {
        console.error(`Unable to fetch user by ID ${id} or user does not exist:`, error);

    } finally {
        res.status(500).json({ error: "Failed to fetch user." });
    }
}








module.exports = {  }