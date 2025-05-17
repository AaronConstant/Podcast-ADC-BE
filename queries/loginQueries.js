const db = require("../db/dbConfig");

const getUserByUsername = async (username) => {
    try {
        const user = await db.one("SELECT * FROM users WHERE username = $1", [username]);
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by username: ${error}`);
    }
}
;
const getUserByEmail = async (email) => {
    try {
        const user = await db.one("SELECT * FROM users WHERE email = $1", [email]);
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by email: ${error}`);
    }
}


module.exports = {getUserByUsername, getUserByEmail}