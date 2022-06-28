export const data = {
    category: [{id: 1, name: 'Tesla'}, {id: 2, name: 'Nissan'}, {id: 3, name: 'Chevrolet'}],
    model: [
        {
            id: 1,
            catId: 1,
            name: 'Model S',
            image: 'model-s.jpg',
            desc: 'Some description',
            range: 375,
            topSpeed: 155,
            acceleration: 3.1,
            peakPower: 1020,
            price: 95840,
            wheels: [
                {id: 1, modelId: 1, size: 19},
                {id: 2, modelId: 1, size: 21},
            ],
            color: ['white', 'black', 'grey', 'blue', 'red'],
            colorsImg:[
                {id:1, name: 'white', modelId:1, wheelId:1, angle:'front', image:'tesla-model-s-front-white-19.png'},
                {id:2, name: 'white', modelId:1, wheelId:1, angle:'back', image:'tesla-model-s-back-white-19.png'},
                {id:3, name: 'black', modelId:1, wheelId:1, angle:'front', image:'tesla-model-s-front-black-19.png'},
                {id:4, name: 'black', modelId:1, wheelId:1, angle:'back', image:'tesla-model-s-back-black-19.png'},
                {id:5, name: 'grey', modelId:1, wheelId:1, angle:'grey', image:'tesla-model-s-front-grey-19.png'},
                {id:6, name: 'grey', modelId:1, wheelId:1, angle:'grey', image:'tesla-model-s-back-grey-19.png'},

            ]
        },
        {id: 2, catId: 1, name: 'Model 3', image: 'model-3.jpg'},
        {id: 3, catId: 1, name: 'Model X', image: 'model-x.jpg'}
    ],
    wheel:[
        {id: 1, modelId: 1, size: 19},
        {id: 2, modelId: 1, size: 21},

    ]

}