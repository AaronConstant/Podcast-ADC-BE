const createTablesIfNotExist = async () => {
    try {
        await db.none(`
            CREATE EXTENSION IF NOT EXISTS pgcrypto;
            
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                phone_number VARCHAR(15) DEFAULT NULL,
                sex_at_birth VARCHAR(50) DEFAULT NULL,
                gender_identity VARCHAR(100) DEFAULT NULL,
                date_of_birth DATE DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS podcast_entries (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title VARCHAR(255) NOT NULL,
                description TEXT,
                audio_url VARCHAR(255) NOT NULL,
                user_id UUID NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
        console.log('✅ Database tables ready');
    } catch (error) {
        console.error('❌ Table creation error:', error);
    }
};

createTablesIfNotExist()