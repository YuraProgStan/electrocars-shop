import * as path from "path";

export const editFileName = (req, file, callback) => {


    const name = file.originalname.split('.')[0];
    const fileExtName = path.extname(file.originalname);

    const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};