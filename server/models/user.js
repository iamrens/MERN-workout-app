import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// static signup method
userSchema.statics.signup = async function (email, password) {

    // validation
    if (!email || !password) {
        throw new Error('Please provide both email and password.')
    }
    if (!validator.isEmail(email)){
        throw new Error('Invalid email format.')
    }

    // requirement for strong passwords
    // const options = {
    //     minLength: 8,
    //     minLowercase: 2,
    //     minUppercase: 2,
    //     minNumbers: 2,
    //     minSymbols: 1,
    // };

    if (!validator.isStrongPassword(password)){
        throw new Error('Password must be strong. Use at least 8 characters, including uppercase letters, digits, and symbols.')
    }   

    const exists = await this.findOne({ email })

    if (exists) {
        throw new Error('Email already in use.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    // validation
    if (!email || !password) {
        throw new Error('Please provide both email and password.')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Invalid email or password.')
    }
    
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error('Incorrect email or password.')
    }

    return user
}

const userModel = mongoose.model('User', userSchema);

export default userModel;