import { hash, compare } from 'bcryptjs';

export async function hashPassword(clearPassword) {
    const hashedPassword = await hash(clearPassword, 12);
    return hashedPassword;
}

export async function verifyPassword(clearPassword, hashedPassword) {
    const isValid = await compare(clearPassword, hashedPassword);
    return isValid;
}