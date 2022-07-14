import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../app';
import resizeImage from '../image-processing';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('gets the api/images endpoint and returns a 500 error if no parameters are set', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(500);
  });
});

describe('Test image processing', () => {
  const filename = 'santamonica';
  const width = '300';
  const height = '300';
  const outputPath =
    path.join(__dirname, '../', '../', 'assets/', 'thumbnails/', filename) +
    `-${width}-${height}.jpg`;
  console.log(outputPath);
  it('resizes an image when proper parameters are set in the url using resize function', async () => {
    await resizeImage(filename, Number(width), Number(height));
    expect(fs.existsSync(outputPath)).toBeTrue();
  });

  it('resizes an image when proper parameters are set in the url', async () => {
    await request.get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(fs.existsSync(outputPath)).toBeTrue();
  });

  it('returns a proper error message when the image does not exist', async () => {
    const response = await request.get(
      `/api/images?filename=test&width=${width}&height=${height}`
    );
    expect(response.text).toBe(
      'There is no such file on the server, please verify the file name.'
    );
  });

  it('returns error message when width or height is not set', async () => {
    const response = await request.get(
      `/api/images?filename=${filename}&width=${width}`
    );
    expect(response.text).toBe('please set width , height and filename');
  });
  it('returns error message if width or height are not numbers', async () => {
    const response = await request.get(
      `/api/images?filename=${filename}&width=${width}&height=test`
    );
    expect(response.text).toBe(
      'There is no such file on the server, please verify the file name.'
    );
  });
});
