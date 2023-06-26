import bcrypt from "bcryptjs";

export default async function encrypt(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const newPass = bcrypt.hash(password, salt);
    return newPass;
}