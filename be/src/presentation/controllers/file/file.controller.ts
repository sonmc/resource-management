import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { of } from 'rxjs';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
@Controller('files')
// @UseGuards(JwtAuthGuard)
export class FileController {
    constructor() {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                    const extension: string = path.parse(file.originalname).ext;
                    cb(null, `${filename}${extension}`);
                },
            }),
        })
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return of({ imagePath: file.path });
    }
}
