import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import {getPathFile} from "../utils/path.file";

@Injectable()

export class RemoveimageService {

    removeImage(path){
        const findPath = getPathFile(path);
        if (fs.existsSync(findPath)) {
            //deleting the path or the file
            console.log('exist')
            fs.unlinkSync(findPath);
        }

        return {message: 'file has been deleted'}
    }
}
