import express from 'express';
import path from 'path';
import resizeImage from '../image-processing';
import fs from 'fs';
import { isArrayOfNums, itemsInArray } from '../utilities/utils';

const routes: express.Router = express.Router();

routes.get(
  '/images',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const params: string[] = ['filename', 'width', 'height'];

    if (
      !itemsInArray(params, Object.keys(request.query)) &&
      !isArrayOfNums([
        Number(request.query.width),
        Number(request.query.height)
      ])
    ) {
      console.log('i am in check');
      response.status(500).send('please set width , height and filename');
    } else {
      const fileName: string = request.query.filename as string;
      const width: number = Number(request.query.width);
      const height: number = Number(request.query.height);

      const imageThumbnailPath: string =
        path.join(__dirname, '../', 'assets/', 'thumbnails/', fileName) +
        `-${width}-${height}.jpg`;

      if (fs.existsSync(imageThumbnailPath)) {
        response.sendFile(imageThumbnailPath);
      } else {
        try {
          const imageResizedPath = await resizeImage(fileName, width, height);
          if (!String(imageResizedPath).includes('Error')) {
            response.sendFile(imageResizedPath);
          }
        } catch (error) {
          response
            .status(404)
            .send(
              'There is no such file on the server, please verify the file name.'
            );
        }
      }
    }
  }
);

export default routes;
