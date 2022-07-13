import express from 'express';
import { hostname } from 'os';
import routes from './routes/index';

const app: express.Application = express();
const port: number = 5000;

app.use('/api', routes);

app.listen(port, async (): Promise<void> => {
  console.log(`Server started at  ${hostname}:${port}`);
});

export default app;
