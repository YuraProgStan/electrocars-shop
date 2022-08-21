import Joi from "joi";

export const LoginValidator = Joi.object({
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
})

export const RegistrationValidator = Joi.object({
    username: Joi.string()
        .regex(/^[[a-zA-ZА-яёЁіІїЇ0-9]{2,20}$/).messages({
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
    // phone: Joi.string()
    //     .regex(/^\+?[1-9][0-9]{7,14}$/).messages({
    //         'string.empty': '"phone" can\'t be empty',
    //         'string.pattern.base': '"phone" cab be numbers 7-14 length'
    //     }),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': '"confirm password" should be equal password'
    }),
})
//  /.+@[^@]+\.[^@]{2,}$/   //pattern variant
export const DeliveryValidator = Joi.object({
    firstName: Joi.string()
        .regex(/^[a-zA-ZА-яёЁіІїЇ]{2,20}$/).messages({
            'string.empty': '"first name" can\'t be an empty field',
            'string.pattern.base': '"username" can be letters, 2-30 length',

        }),
    lastName: Joi.string()
        .regex(/^[a-zA-ZА-яёЁіІїЇ]{2,20}$/).messages({
            'string.empty': '"last name" can\'t be an empty field',
            'string.pattern.base': '"username" can be letters, 2-20 length',

        }),
    phone: Joi.string()
        .regex(/^\+?[1-9][0-9]{7,14}$/).messages({
            'string.empty': '"phone" can\'t be empty',
            'string.pattern.base': '"phone" cab be numbers 7-14 length'
        }),
    streetAddress: Joi.string()
        .regex(/^[a-zA-ZА-яёЁіІїЇ\s\d]{5,30}$/).messages({
            'string.empty': '"street address" can\'t be an empty field',
            'string.pattern.base': '"street address" can be letters, 5-30 length',
        }),
    aptNumber: Joi.number()
        .messages({
            'string.empty': '"apt number" can\'t be an empty field',
        }),
    country: Joi.string()
        .regex(/^[a-zA-ZА-яёЁіІїЇ\s]{3,30}$/).messages({
            'string.empty': '"country" can\'t be an empty field',
            'string.pattern.base': '"city" can be letters, 3-30 length',
        }),
    city: Joi.string()
        .regex(/^[a-zA-ZА-яёЁіІїЇ\s]{3,30}$/).messages({
            'string.empty': '"city" can\'t be an empty field',
            'string.pattern.base': '"city" can be letters, 5-30 length',
        }),
    zip: Joi.string()
        .regex(/^[\d]{2,10}$/).messages({
            'string.empty': '"zip" can\'t be an empty field',
            'string.pattern.base': '"zip" can be numbers, 2-10 length',
        }),

})

export const UserUpdateValidator = Joi.object({

    username: Joi.string()
        .regex(/^[a-zA-ZА-яёЁіІїЇ0-9]{2,30}$/).messages({
            'string.empty': '"username" can\'t be an empty field',
            'string.pattern.base': '"username" can be letters, 2-30 length',

        }),
    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).messages({
            'string.empty': '"email" can\'t be empty',
            'string.email': 'Not allowed email'
        }),
    phone: Joi.string().optional()
        .regex(/^\+?[1-9][0-9]{7,14}$/).messages({
            'string.pattern.base': '"phone" cab be numbers 7-14 length'
        }).allow('', null),
    status: Joi.boolean(),
    changePassword: Joi.boolean(),
    role: Joi.string().optional()
        .valid('USER', 'ADMIN').allow('', null),
    password: Joi.string()
        .when('changePassword', {
            is: true,
            then: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).messages({
                'string.empty': '"password" can\'t be empty',
                'string.pattern.base': '"password" cab be numbers and letters, 5-30 length'
            }),
        }),
    confirmPassword: Joi.string()
        .when('changePassword', {
            is: true,
            then: Joi.string().valid(Joi.ref('password')).messages({
                'any.only': '"confirm password" should be equal password'
            })
        })
})

export const UserCreateValidator = Joi.object({

    username: Joi.string()
        .regex(/^[a-zA-ZА-яёЁіІїЇ0-9]{2,30}$/).messages({
            'string.empty': '"username" can\'t be an empty field',
            'string.pattern.base': '"username" can be letters, 2-30 length',

        }),
    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).messages({
            'string.empty': '"email" can\'t be empty',
            'string.email': 'Not allowed email'
        }),
    phone: Joi.string().optional()
        .regex(/^\+?[1-9][0-9]{7,14}$/).messages({
            'string.pattern.base': '"phone" cab be numbers 7-14 length'
        }).allow('', null),
    status: Joi.boolean(),
    role: Joi.string().optional()
        .valid('USER', 'ADMIN').allow('', null),
    /*
    const SomeEnumType = { TypeA: 'A', TypeB: 'B' };
    type: Joi.string().valid(...Object.values(SomeEnumType)),
     */
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{5,30}$/).messages({
            'string.empty': '"password" can\'t be empty',
            'string.pattern.base': '"password" cab be numbers and letters, 5-30 length'

        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password')).messages({
            'any.only': '"confirm password" should be equal password'
        })
})
    export const BrandValidator = Joi.object({
        name: Joi.string()
            .regex(/^[a-zA-ZА-яёЁіІїЇ0-9]{2,30}$/).messages({
                'string.empty': '"name" can\'t be an empty field',
                'string.pattern.base': '"name" can be letters, 2-30 length',

            }),
    })


export const ModelCreateValidator = Joi.object({

    username: Joi.string()
        .regex(/^[a-zA-ZА-яёЁіІїЇ0-9]{2,30}$/).messages({
            'string.empty': '"username" can\'t be an empty field',
            'string.pattern.base': '"username" can be letters, 2-30 length',

        }),
    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).messages({
            'string.empty': '"email" can\'t be empty',
            'string.email': 'Not allowed email'
        }),
    phone: Joi.string().optional()
        .regex(/^\+?[1-9][0-9]{7,14}$/).messages({
            'string.pattern.base': '"phone" cab be numbers 7-14 length'
        }).allow('', null),
    status: Joi.boolean(),
    role: Joi.string().optional()
        .valid('USER', 'ADMIN').allow('', null),
    /*
    const SomeEnumType = { TypeA: 'A', TypeB: 'B' };
    type: Joi.string().valid(...Object.values(SomeEnumType)),
     */
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{5,30}$/).messages({
            'string.empty': '"password" can\'t be empty',
            'string.pattern.base': '"password" cab be numbers and letters, 5-30 length'

        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password')).messages({
            'any.only': '"confirm password" should be equal password'
        })
})