const app = require('./app');
const { db } = require('./db/dbConfig'); 

require('dotenv').config();

const PORT = process.env.PORT || 4040;

    app.listen(PORT, (err) => {
        if (err) {
            console.error(`Failed to start the server: ${err.message}`);
            process.exit(1);
        }
        console.log(`Server is running on port ${PORT}`);
    });
