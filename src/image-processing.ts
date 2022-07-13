import sharp from 'sharp';
import path from 'path';
import { promises as fsPromises } from 'fs';
import fs from 'fs';

const resizeImage = async (
  fileName: string,
  width: number,
  height: number
): Promise<string> => {
  const imageInputPath: string =
    path.join(__dirname, '../', 'assets/', 'images/', fileName) + '.jpg';

  const imageOutputFolder: string = path.join(
    __dirname,
    '../',
    'assets/',
    'thumbnails/'
  );

  const imageOutputPath: string =
    path.join(__dirname, '../', 'assets/', 'thumbnails/', fileName) +
    `-${width}-${height}.jpg`;

  if (!fs.existsSync(imageOutputFolder)) {
    await fsPromises.mkdir(imageOutputFolder);
  }

  try {
    await sharp(imageInputPath).resize(width, height).toFile(imageOutputPath);
    return imageOutputPath;
  } catch (error) {
    console.error(error);
  }
  return '';
};

export default resizeImage;
