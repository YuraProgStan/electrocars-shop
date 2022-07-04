
export default () => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    database: {
        // host: process.env.DATABASE_HOST,
        // port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
});

export enum RoleEnum {
    Client = 'USER',
    Admin = 'ADMIN',
    SuperAdmin = 'SUPERADMIN',
}

export enum ColorEnum {
   black = 'black',
   white = 'white',
   grey = 'grey',
   blue = 'blue',
   red = 'red',
   cream = 'cream'
}

export enum AngleEnum{
    front = 'front',
    back = 'back'
}