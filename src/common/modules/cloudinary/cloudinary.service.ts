import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Multer } from 'multer';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  constructor(private readonly config: ConfigService) {}
  onModuleInit() {
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async delete(publicId: string) {
    cloudinary.uploader.destroy(publicId);
  }

  async upload(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `joli_crm/${folder}`,
          resource_type: 'image',
        },
        (err, result) => {
          if (err || !resolve) {
            console.log({ err });

            return reject(
              new InternalServerErrorException('Failed To Upload Image'),
            );
          }

          resolve(result!);
        },
      );

      Readable.from(file.buffer).pipe(stream);
    });
  }
}
