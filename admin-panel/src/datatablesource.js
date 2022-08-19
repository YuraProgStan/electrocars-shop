
export const userColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'user', headerName: 'User', width: 230, renderCell: (params) => {
        return(
            <div className="cellWithImg">
                <img className="cellImg" src={params.row.avatar ? `${process.env.REACT_APP_API}/avatars/`+ params.row.avatar : "https://www.kindpng.com/picc/m/22-223887_no-avatar-png-cartoon-boy-no-face-transparent.png"} alt="avatar"/>
                {params.row.username}
            </div>
        )
        }},
    {field: 'email', headerName: 'Email', width: 230},
    {field: 'role', headerName: 'Role', width: 100},
    {field: 'status', headerName: 'Status', width: 160,
        renderCell:  (params) =>{
        return(
            <div className={`cellWithStatus  ${params.row.status? 'active' : 'pending'}`}>
                {params.row.status? 'active' : 'pending'}
            </div>
        )
        },
    },
];

export const brandColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 230},
];

export const modelColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 230, renderCell: (params) => {
            return(
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.image ? `${process.env.REACT_APP_API}/`+ params.row.image : "https://www.kindpng.com/picc/m/22-223887_no-avatar-png-cartoon-boy-no-face-transparent.png"} alt="model"/>
                    {params.row.name}
                </div>
            )
        }},
    {field: 'description', headerName: 'Description', width: 350},
    {field: 'range', headerName: 'Range', width: 70},
    {field: 'topSpeed', headerName: 'Top Speed', width: 100},
    {field: 'acceleration', headerName: 'Acceleration', width: 100},
    {field: 'price', headerName: 'Price', width: 100,
            renderCell:  (params) =>{
                return(
                    <div className={`cellWithPrice`} style={{textAlign:'right'}}>
                        {params.row.price.toLocaleString('en-US')}
                    </div>
                )
            },
    },
    // {field: 'status', headerName: 'Status', width: 160,
    //     renderCell:  (params) =>{
    //         return(
    //             <div className={`cellWithStatus  ${params.row.status? 'active' : 'pending'}`}>
    //                 {params.row.status? 'active' : 'pending'}
    //             </div>
    //         )
    //     },
    // },
];

export const productColumns = [
    {field: '_id', headerName: 'ID', width: 200},
    {field: 'product', headerName: 'Product', width: 250, renderCell: (params) => {
            return(
                <div className={'cellWithImg'}>
                    <img className={'cellImg'} src={params.row.img} alt="avatar"/>
                    {params.row.title}
                </div>
            )
        }},
    {field: 'inStock', headerName: 'Stock', width: 100,},
    {field: 'price', headerName: 'Price', width: 160,},

];
//temporary data
export const userRows = [
    {
        id: 1,
        username: "Snow",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        status: "active",
        email: "1snow@gmail.com",
        age: 35,
    },
    {
        id: 2,
        username: "Jamie Lannister",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "2snow@gmail.com",
        status: "passive",
        age: 42,
    },
    {
        id: 3,
        username: "Lannister",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "3snow@gmail.com",
        status: "pending",
        age: 45,
    },
    {
        id: 4,
        username: "Stark",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "4snow@gmail.com",
        status: "active",
        age: 16,
    },
    {
        id: 5,
        username: "Targaryen",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "5snow@gmail.com",
        status: "passive",
        age: 22,
    },
    {
        id: 6,
        username: "Melisandre",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "6snow@gmail.com",
        status: "active",
        age: 15,
    },
    {
        id: 7,
        username: "Clifford",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "7snow@gmail.com",
        status: "passive",
        age: 44,
    },
    {
        id: 8,
        username: "Frances",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "8snow@gmail.com",
        status: "active",
        age: 36,
    },
    {
        id: 9,
        username: "Roxie",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "snow@gmail.com",
        status: "pending",
        age: 65,
    },
    {
        id: 10,
        username: "Roxie",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "snow@gmail.com",
        status: "active",
        age: 65,
    },
];