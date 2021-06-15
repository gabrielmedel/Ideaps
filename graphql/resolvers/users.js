const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkAuth = require('../../util/check-auth')
require('dotenv').config()
const { UserInputError } = require('apollo-server')
const {
    validateRegisterInput,
    validateLoginInput,
} = require('../../util/validator')

const generateToken = (email) => {
    return jwt.sign(
        {
            id: email.id,
            userImage: email.userImage,
            username: email.username,
            role: 'user',
        },
        process.env.SECRET_JWT,
        {
            expiresIn: '15m',
        }
    )
}

module.exports = {
    Mutation: {
        async login(_, { email, password }) {
            const { errors, valid } = validateLoginInput(email, password)

            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            const userEmail = await User.findOne({ email })

            if (!userEmail) {
                errors.general = 'Email not found'
                throw new UserInputError('Email not found', { errors })
            } else {
                const match = await bcrypt.compare(password, userEmail.password)
                if (!match) {
                    errors.general = 'Email or password are incorrect'
                    throw new UserInputError('Wrong credentials', { errors })
                }
            }

            const token = generateToken(userEmail)

            return {
                ...userEmail._doc,
                id: userEmail._id,
                token,
            }
        },

        async register(_, { registerInput: { username, email, password } }) {
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password
            )

            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username is already taken', {
                    errors: {
                        username: 'Username is already taken',
                    },
                })
            }
            const userEmail = await User.findOne({ email })
            if (userEmail) {
                throw new UserInputError('Email is already taken', {
                    errors: {
                        email: 'Email is already taken',
                    },
                })
            }

            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            })
            const res = await newUser.save()

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token,
            }
        },
    },
}
