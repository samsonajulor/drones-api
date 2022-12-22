import '@babel/polyfill';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config';

const production = env.ENV === 'LIVE';

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('trust proxy', 1);

if (!production) {
  app.use(errorhandler());
}

if (!production) {
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.get('/dispatch', (_req: Request, res: Response) =>
  res.status(200).send({
    message: 'Dispatch API is running...',
  })
);

app.all('*', (_req, res) => res.status(404).send({ message: 'route not found' }));

const server: any = app.listen(process.env.PORT || 3000, () => {
  const { port } = server.address() as AddressInfo;
  console.log(`Listening on port ${port}`);
});

export default app;
