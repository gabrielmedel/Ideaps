const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
            email: email.email,
            username: email.username,
        },
        process.env.SECRET_JWT,
        {
            expiresIn: '1h',
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
                    errors.general = 'Wrong credentials'
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

        async register(
            _,
            { registerInput: { username, email, password, confirmPassword } }
        ) {
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            )

            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken',
                    },
                })
            }
            const userEmail = await User.findOne({ email })
            if (userEmail) {
                throw new UserInputError('email is taken', {
                    errors: {
                        email: 'This email is taken',
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
