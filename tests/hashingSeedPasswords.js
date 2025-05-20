const bcrypt = require('bcrypt')

async function hashingSeedPasswords() {
    const passwords = ['password123', 'securepass456', 'bobbyspassword', 'alice1234', 'mike_secure'];

    for(const pw of passwords) {
        const hash = await bcrypt.hash(pw,10)
        console.log(`Hashed Password ${pw}:`,hash)
    }
}
hashingSeedPasswords();