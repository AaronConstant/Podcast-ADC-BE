const { db } = require('../db/dbConfig');

const getAllEntries = async (user_id) => {
    try {
        return await db.any("SELECT * FROM podcast_entries WHERE user_id = $1", [user_id]);
    } catch (error) {
        throw new Error(`Error fetching entries: ${error}`);
    }
};

const getSpecificEntry = async (id, user_id) => {
    try {
        return await db.one("SELECT * FROM podcast_entries WHERE user_id = $1 AND id = $2", [user_id, id]);
    } catch (error) {
        throw new Error(`Error fetching entry: ${error}`);
    }
};

const createEntry = async (user_id, podcastData) => {
    try {
        return await db.one(
            `INSERT INTO podcast_entries (
                title, 
                description, 
                audio_url, 
                user_id)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [
                podcastData.title, 
                podcastData.description, 
                podcastData.audio_url, 
                user_id
            ]
        );
    } catch (error) {
        throw new Error(`Error creating entry: ${error}`);
    }
};

const updateEntry = async (id, user_id, podcastData) => {
    try {
        return await db.one(
            `UPDATE podcast_entries
             SET 
             title = $1, 
             description = $2, 
             audio_url = $3, 
             updated_at = NOW()
             WHERE id = $4 AND user_id = $5
             RETURNING *`,
            [
                podcastData.title, 
                podcastData.description, 
                podcastData.audio_url, 
                id, 
                user_id
            ]
        );
    } catch (error) {
        throw new Error(`Error updating entry: ${error}`);
    }
};

const deleteEntry = async (id, user_id) => {
    try {
        return await db.one("DELETE FROM podcast_entries WHERE id = $1 AND user_id = $2 RETURNING *", [id, user_id]);
    } catch (error) {
        throw new Error(`Error deleting entry: ${error}`);
    }
};

module.exports = {
    getAllEntries,
    getSpecificEntry,
    createEntry,
    updateEntry,
    deleteEntry
};
