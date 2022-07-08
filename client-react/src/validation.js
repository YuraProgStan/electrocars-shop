import Joi from "joi";

export const LoginValidator = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
            'string.empty':'"password" can\'t be empty',
            'string.pattern':'Only numbers and letters, min 3 length'
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

export const RegistrationValidator = Joi.object({
    username: Joi.string()
        .regex(/^[[a-zA-ZА-яёЁіІїЇ]{2,20}$/).messages({
            'string.empty': '"username" can\'t be an empty field',
            'string.pattern.base': '"username" can be letters, 2-30 length',

        }),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{5,30}$/).messages({
            'string.empty': '"password" can\'t be empty',
            'string.pattern.base': '"password" cab be numbers and letters, 5-30 length'
        }),

    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).messages({
            'string.empty': '"email" can\'t be empty',
            'string.email': 'Not allowed email'
        }),
    phone: Joi.string()
        .regex(/^\+?[1-9][0-9]{7,14}$/).messages({
            'string.empty': '"phone" can\'t be empty',
            'string.pattern.base': '"phone" cab be numbers 7-14 length'
        }),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': '"confirm password" should be equal password'
    }),
})
//  /.+@[^@]+\.[^@]{2,}$/   //pattern variant
