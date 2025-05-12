const validateUser = (req, res, next) => {
    const { first_name, last_name, username, password, email, phone_number} = req.body;
    const errors = new Map();
    // Come back to this later and apply  DRY for the fieldchecks.

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\(\d{3}\)\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;


    if (!first_name || typeof first_name !== 'string') {
        errors.set('first_name', 'First name is required and must be a string.');
    }
    if (!last_name || typeof last_name !== 'string') {
        errors.set('last_name', 'Last name is required and must be a string.');
    }
    if (!username || typeof username !== 'string') {
        errors.set('username', 'Username is required and must be a string.');
    }
    if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
        errors.set('password', 'Password is required and must be a string.');
    }
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        errors.set('email', 'Email is required and must be a string.');
    }
    if (!phone_number || typeof phone_number !== 'string' || !phoneRegex.test(phone_number)) {
        errors.set('phone_number', 'Phone number is required and must be a string.');
    }
    if (errors.size > 0) {
        return res.status(400).json({
            errors: Object.fromEntries(errors)
        });
    }
    next();
}
module.exports = { validateUser };