export const data = {
    brands: [{id: 1, name: 'Tesla'}, {id: 2, name: 'Nissan'}, {id: 3, name: 'Chevrolet'}],
    model: [
        {
            id: 1,
            brandId: 1,
            name: 'Model S',
            image: 'model-s.jpg',
            salonImage: 'tesla-model-s-interior.png',
            description: 'Acceleration 0-60 mph\n' +
                'Model S\t3.1 sec\n' +
                'Model S Plaid\t1.99 sec*\n' +
                'Range\n' +
                '\n' +
                'Model S\t375 - 405 miles\n' +
                'Model S Plaid\t348 - 396 miles\n' +
                'Range varies with wheel selection and is reflected under each wheel option\n' +
                'Top Speed\n' +
                'Model S\t155 mph\n' +
                'Model S Plaid\t200 mph\n' +
                '\n' +
                'Drivetrain\n' +
                '\n' +
                'Model S\tDual Motor All-Wheel Drive\n' +
                'Model S Plaid\tTri Motor All-Wheel Drive\n' +
                'Powerful Efficiency\n' +
                'Tesla designed Model S from the ground-up as an electric vehicle — each component, including batteries, motors and exterior aerodynamics are optimized to benefit from one another and create one of the most efficient, yet unbelievably powerful vehicles ever built.\n' +
                '*With first foot of rollout subtracted.\n' +
                'The indicated Plaid top speed requires paid hardware upgrades.',
            range: 405,
            rangeUnits: 'mi',
            rangeDesc: 'Range (est.)',
            topSpeed: 155,
            topSpeedUnits: 'mph',
            topSpeedDesc: 'Top Speed',
            acceleration: 3.1,
            accelerationUnits: 'sec',
            accelerationDesc: '0-60 mph',
            price: 95840,
            wheels: [
                {id: 1, modelId: 1, size: 19},
                {id: 2, modelId: 1, size: 21},
            ],
            color: ['white', 'black', 'grey', 'blue', 'red'],

        },
        {id: 2,
            brandId: 1,
            name: 'Model 3',
            image: 'model-3.jpg',
            salonImage: 'tesla-model-s-interior.png',
            description: 'Acceleration 0-60 mph\n' +
                'Model 3\t5.8 sec\n' +
                'Model 3 Long Range\t4.2 sec\n' +
                'Model 3 Performance\t3.1 sec*\n' +
                'Range\n' +
                'Model 3\t267 - 272 miles\n' +
                'Model 3 Long Range\t334 - 358 miles\n' +
                'Model 3 Performance\t315 miles\n' +
                'Range varies with wheel selection and is reflected under each wheel option\n' +
                'Top Speed\n' +
                'Model 3\t140 mph\n' +
                'Model 3 Long Range\t145 mph\n' +
                'Model 3 Performance\t162 mph\n' +
                'Drivetrain\n' +
                'Model 3\tRear-Wheel Drive\n' +
                'Model 3 Long Range\tDual Motor All-Wheel Drive\n' +
                'Model 3 Performance\tDual Motor All-Wheel Drive\n' +
                'Powerful Efficiency\n' +
                'Tesla designed Model 3 from the ground-up as an electric vehicle using system-level integration throughout. Each component, including batteries, motors and even exterior aerodynamics are optimized to benefit from one another and create one of the most efficient, yet unbelievably powerful vehicles ever built.\n' +
                '*With first foot of rollout subtracted.',
            range: 354,
            rangeDesc: 'Range (est.)',
            topSpeed: 145,
            topSpeedDesc: 'Top Speed',
            acceleration: 4.2,
            accelerationDesc: '0-60 mph',
            price: 57990,
        },
        {id: 3,
            brandId: 1,
            name: 'Model X',
            image: 'model-x.jpg',
            description: 'Acceleration 0-60 mph\n' +
                'Model X\t3.8 sec\n' +
                'Model X Plaid\t2.5 sec*\n' +
                'Range\n' +
                'Model X\t329 - 351 miles\n' +
                'Model X Plaid\t310 - 335 miles\n' +
                'Range varies with wheel and seating selection and is reflected under each option\n' +
                'Top Speed\n' +
                'Model X\t155 mph\n' +
                'Model X Plaid\t163 mph\n' +
                'Drivetrain\n' +
                'Model X\tDual Motor All-Wheel Drive\n' +
                'Model X Plaid\tTri Motor All-Wheel Drive\n' +
                'Powerful Efficiency\n' +
                'Tesla designed Model X from the ground-up as an electric vehicle — each component, including batteries, motors and exterior aerodynamics are optimized to benefit from one another and create one of the most efficient, yet unbelievably powerful vehicles ever built.\n' +
                '*With first foot of rollout subtracted.',
            range: 351,
            rangeDesc: 'Range (est.)',
            topSpeed: 155,
            topSpeedDesc: 'Top Speed',
            acceleration: 3.8,
            accelerationDesc: '0-60 mph',
            price: 120990,
        },
        {id: 4, brandId: 2, name: 'Nissan Leaf', image: 'nissan-leaf.jpg', salonImage: 'tesla-model-s-interior.png'},
        {id: 5, brandId: 3, name: 'Chevrolet Bolt', image: 'chevrolet-bolt.jpg', salonImage: 'tesla-model-s-interior.png'},
    ],
    wheels:[
        {id: 1, modelId: 1, brandId:1, size: 19, image: 'model-s-wheel-19.png', markup: 0, description: 'Tempest Wheels', rangeRatio: 0},
        {id: 2, modelId: 1, brandId:1, size: 21, image: 'model-s-wheel-21.png', markup: 4500, description: 'Arachnid Wheels',  rangeRatio: -30},
        {id: 3, modelId: 2, brandId:1, size: 18, image: 'model-3-wheel-18.png', markup: 0, description: 'Aero Wheels', rangeRatio: 0},
        {id: 4, modelId: 2, brandId:1, size: 19, image: 'model-3-wheel-19.png', markup: 1500, description: 'Sport Wheels', rangeRatio: -24 },
        {id: 5, modelId: 3, brandId:1, size: 20, image: 'model-x-wheel-20.png', markup: 0, description: 'Cyberstream Wheels', rangeRatio: 0},
        {id: 6, modelId: 3, brandId:1, size: 22, image: 'model-x-wheel-22.png', markup: 5500, description: 'Turbine Wheels', rangeRatio: -19},

    ],
    interior:[
        {id: 1, modelId: 1, brandId:1, image: 'model-s-interior-black.jpg', markup: 0, description: 'All Black', color: 'black', decor: 'Ebony Decor'},
        {id: 2, modelId: 1, brandId:1, image: 'model-s-interior-white.jpg', markup: 2000, description: 'Black and White', color: 'white', decor: 'Walnut Decor'},
        {id: 3, modelId: 1, brandId:1, image: 'model-s-interior-crem.jpg', markup: 2000, description: 'Cream', color: 'cream', decor: 'Walnut Decor'},
        {id: 4, modelId: 2, brandId:1, image: 'model-3-interior-black.jpg', markup: 0, description: 'All Black', color: 'black',  decor: null},
        {id: 5, modelId: 2, brandId:1, image: 'model-3-interior-white.jpg', markup: 1000, description: 'Black and White', color: 'white',  decor: null},
        {id: 6, modelId: 3, brandId:1, image: 'model-x-interior-black.jpg', markup: 0, description: 'All Black', color: 'black',  decor: 'Walnut Decor'},
        {id: 7, modelId: 3, brandId:1, image: 'model-x-interior-white.jpg', markup: 2000, description: 'Black and White', color: 'white', decor: 'Ebony Decor'},
        {id: 8, modelId: 3, brandId:1, image: 'model-x-interior-crem.jpg', markup: 2000, description: 'Cream', color: 'crem',  decor: 'Ebony Decor'},
    ],
    colorsImg:[
        {id:1, name: 'white', modelId:1, wheelId:1, angle:'front', image:'tesla-model-s-front-white-19.png'},
        {id:2, name: 'white', modelId:1, wheelId:1, angle:'back', image:'tesla-model-s-back-white-19.png'},
        {id:3, name: 'grey', modelId:1, wheelId:1, angle:'front', image:'tesla-model-s-front-grey-19.png'},
        {id:4, name: 'grey', modelId:1, wheelId:1, angle:'back', image:'tesla-model-s-back-grey-19.png'},
        {id:5, name: 'blue', modelId:1, wheelId:1, angle:'front', image:'tesla-model-s-front-blue-19.png'},
        {id:6, name: 'blue', modelId:1, wheelId:1, angle:'back', image:'tesla-model-s-back-blue-19.png'},
        {id:7, name: 'black', modelId:1, wheelId:1, angle:'front', image:'tesla-model-s-front-black-19.png'},
        {id:8, name: 'black', modelId:1, wheelId:1, angle:'back', image:'tesla-model-s-back-black-19.png'},
        {id:9, name: 'red', modelId:1, wheelId:1, angle:'front', image:'tesla-model-s-front-red-19.png'},
        {id:10, name: 'red', modelId:1, wheelId:1, angle:'back', image:'tesla-model-s-back-red-19.png'},
        {id:11, name: 'white', modelId:1, wheelId:2, angle:'front', image:'tesla-model-s-front-white-21.png'},
        {id:12, name: 'white', modelId:1, wheelId:2, angle:'back', image:'tesla-model-s-back-white-21.png'},
        {id:13, name: 'grey', modelId:1, wheelId:2, angle:'front', image:'tesla-model-s-front-grey-21.png'},
        {id:14, name: 'grey', modelId:1, wheelId:2, angle:'back', image:'tesla-model-s-back-grey-21.png'},
        {id:15, name: 'blue', modelId:1, wheelId:2, angle:'front', image:'tesla-model-s-front-blue-21.png'},
        {id:16, name: 'blue', modelId:1, wheelId:2, angle:'back', image:'tesla-model-s-back-blue-21.png'},
        {id:17, name: 'black', modelId:1, wheelId:2, angle:'front', image:'tesla-model-s-front-black-21.png'},
        {id:18, name: 'black', modelId:1, wheelId:2, angle:'back', image:'tesla-model-s-back-black-21.png'},
        {id:19, name: 'red', modelId:1, wheelId:2, angle:'front', image:'tesla-model-s-front-red-21.png'},
        {id:20, name: 'red', modelId:1, wheelId:2, angle:'back', image:'tesla-model-s-back-red-21.png'},
        {id:21, name: 'white', modelId:2, wheelId:3, angle:'front', image:'model-3-front-white-18.png'},
        {id:22, name: 'white', modelId:2, wheelId:3, angle:'back', image:'model-3-back-white-18.png'},
        {id:23, name: 'grey', modelId:2, wheelId:3, angle:'front', image:'model-3-front-grey-18.png'},
        {id:24, name: 'grey', modelId:2, wheelId:3, angle:'back', image:'model-3-back-grey-18.png'},
        {id:25, name: 'blue', modelId:2, wheelId:3, angle:'front', image:'model-3-front-blue-18.png'},
        {id:26, name: 'blue', modelId:2, wheelId:3, angle:'back', image:'model-3-back-blue-18.png'},
        {id:27, name: 'black', modelId:2, wheelId:3, angle:'front', image:'model-3-front-black-18.png'},
        {id:28, name: 'black', modelId:2, wheelId:3, angle:'back', image:'model-3-back-black-18.png'},
        {id:29, name: 'red', modelId:2, wheelId:3, angle:'front', image:'model-3-front-red-18.png'},
        {id:30, name: 'red', modelId:2, wheelId:3, angle:'back', image:'model-3-back-red-18.png'},
        {id:31, name: 'white', modelId:2, wheelId:4, angle:'front', image:'model-3-front-white-19.png'},
        {id:32, name: 'white', modelId:2, wheelId:4, angle:'back', image:'model-3-back-white-19.png'},
        {id:33, name: 'grey', modelId:2, wheelId:4, angle:'front', image:'model-3-front-grey-19.png'},
        {id:34, name: 'grey', modelId:2, wheelId:4, angle:'back', image:'model-3-back-grey-19.png'},
        {id:35, name: 'blue', modelId:2, wheelId:4, angle:'front', image:'model-3-front-blue-19.png'},
        {id:36, name: 'blue', modelId:2, wheelId:4, angle:'back', image:'model-3-back-blue-19.png'},
        {id:37, name: 'black', modelId:2, wheelId:4, angle:'front', image:'model-3-front-black-19.png'},
        {id:38, name: 'black', modelId:2, wheelId:4, angle:'back', image:'model-3-back-black-19.png'},
        {id:39, name: 'red', modelId:2, wheelId:4, angle:'front', image:'model-3-front-red-19.png'},
        {id:40, name: 'red', modelId:2, wheelId:4, angle:'back', image:'model-3-back-red-19.png'},
        {id:41, name: 'white', modelId:3, wheelId:5, angle:'front', image:'model-x-front-white-20.png'},
        {id:42, name: 'white', modelId:3, wheelId:5, angle:'back', image:'model-x-back-white-20.png'},
        {id:43, name: 'grey', modelId:3, wheelId:5, angle:'front', image:'model-x-front-grey-20.png'},
        {id:44, name: 'grey', modelId:3, wheelId:5, angle:'back', image:'model-x-back-grey-20.png'},
        {id:45, name: 'blue', modelId:3, wheelId:5, angle:'front', image:'model-x-front-blue-20.png'},
        {id:46, name: 'blue', modelId:3, wheelId:5, angle:'back', image:'model-x-back-blue-20.png'},
        {id:47, name: 'black', modelId:3, wheelId:5, angle:'front', image:'model-x-front-black-20.png'},
        {id:48, name: 'black', modelId:3, wheelId:5, angle:'back', image:'model-x-back-black-20.png'},
        {id:49, name: 'red', modelId:3, wheelId:5, angle:'front', image:'model-x-front-red-20.png'},
        {id:50, name: 'red', modelId:3, wheelId:5, angle:'back', image:'model-x-back-red-20.png'},
        {id:51, name: 'white', modelId:3, wheelId:6, angle:'front', image:'model-x-front-white-22.png'},
        {id:52, name: 'white', modelId:3, wheelId:6, angle:'back', image:'model-x-back-white-22.png'},
        {id:53, name: 'grey', modelId:3, wheelId:6, angle:'front', image:'model-x-front-grey-22.png'},
        {id:54, name: 'grey', modelId:3, wheelId:6, angle:'back', image:'model-x-back-grey-22.png'},
        {id:55, name: 'blue', modelId:3, wheelId:6, angle:'front', image:'model-x-front-blue-22.png'},
        {id:56, name: 'blue', modelId:3, wheelId:6, angle:'back', image:'model-x-back-blue-22.png'},
        {id:57, name: 'black', modelId:3, wheelId:6, angle:'front', image:'model-x-front-black-22.png'},
        {id:58, name: 'black', modelId:3, wheelId:6, angle:'back', image:'model-x-back-black-22.png'},
        {id:59, name: 'red', modelId:3, wheelId:6, angle:'front', image:'model-x-front-red-22.png'},
        {id:60, name: 'red', modelId:3, wheelId:6, angle:'back', image:'model-x-back-red-22.png'},

    ],

}