const {db} = require('../db/dbConfig');
const bcrypt = require('bcrypt')
const saltRounds = 10

const getAllUsers = async () => {
    try {
        const allUsers = await db.any("SELECT * FROM users");
        return allUsers;
    }catch (error) {
        return `Error fetching all users: ${error}`;
    }
}
const getUserById = async (id) => {
    if (!id) {
        throw new Error("ID is required for user lookup.");
    }
    try {
        const userById = await db.one("SELECT * FROM users WHERE id=$1", [id]);
        return userById;
    } catch (error) {
        throw new Error(`Error fetching user by ID ${id}: ${error.message}`);
    }
};

const createUser = async (userData) => {
    if (!userData) {
        return `Error: User data is required for creation.`;
    }
    if (!userData.first_name || !userData.last_name || !userData.username || !userData.password || !userData.email || !userData.phone_number || !userData.date_of_birth) {
        return `Error: All fields are required.`;
    }

    try {
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

        const newUser = await db.one(
            `INSERT INTO users (
            first_name, 
            last_name, 
            username, 
            password, 
            email, 
            phone_number, 
            sex_at_birth, 
            gender_identity, 
            date_of_birth
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
               userData.first_name,
               userData.last_name,
               userData.username,
               hashedPassword,
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

const updateUser = async (id, userData) => {
    try {
        const updatingUser = await db.one(
            `UPDATE users SET 
            first_name=$1, 
            last_name=$2, 
            username=$3, 
            password=$4,
            email=$5, 
            phone_number=$6,
            sex_at_birth=$7, 
            gender_identity=$8, 
            date_of_birth=$9 
            WHERE id=$10 RETURNING *`,
            [
                userData.first_name, 
                userData.last_name, 
                userData.username, 
                userData.password, 
                userData.email, 
                userData.phone_number,
                userData.sex_at_birth,
                userData.gender_identity,
                userData.date_of_birth,
                id
            ]
        );
        return updatingUser;
    } catch (error) {
        return `Error updating user with ID ${id}: ${error}`;
    }   
}

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.one(
            'DELETE FROM users WHERE id=$1 RETURNING *',
            [id]
        );
        return deletedUser;
    } catch (error) {
        return `Error deleting user with ID ${id}: ${error}`;
    }
}





module.exports = {
    getAllUsers, 
    getUserById, 
    createUser , 
    updateUser, 
    deleteUser
};