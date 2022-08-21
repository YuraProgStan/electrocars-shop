import { join } from 'path';
export const getPathFile = (path) => {
    //const name = file.originalname.split('.')[0];
    const filePath = join(__dirname, "..", "..", 'images', path);
    console.log('filePath', filePath);
    return filePath;
};