import bcrypt from 'bcrypt';

// Function to hash the password using bcrypt
async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

export default hashPassword