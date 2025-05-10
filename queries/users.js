const {db} = require('../db/dbConfig');

const getAllUsers = async () => {
    try {
        const users = await db.any('SELECT * FROM users');
        res.status(200).json(users);
    } catch (error) {
        return `Error fetching users: ${error}`;
    }
}
const getUserById = async (id) => {
    if (!id) {
        return res.status(400).json({ error: "User ID is required." });
    }
    try{
        const userById = await db.one("SELECT * FROM users WHERE id=$1", id);
        return userById;
    } catch (error) {
        return `Error fetching user by ID ${id}: ${error}`;
    } finally {
        res.status(500).json({ error: "Failed to fetch user." });
    }
}

const createUser = async (userData) => {
    

    try {
        const newUser = await db.one(
            'INSERT INTO users (first_name, last_name, username, password, email, phone_number, sex_at_birth, gender_identity, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [
                userData.first_name, 
                userData.last_name, 
                userData.username, 
                userData.password, 
                userData.email, 
                userData.phone_number,
                userData.sex_at_birth,
                userData.gender_identity,
                userData.date_of_birth
            ]
        );
        return newUser;

} catch (error) {
        return `Error creating user: ${error}`;
    }
}





module.exports = {getAllUsers, getUserById, createUser};