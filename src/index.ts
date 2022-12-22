import '@babel/polyfill';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import { exec } from 'child_process';
import cookieParser from 'cookie-parser';
import { env } from './config';
import routes from './routes';

const production = env.ENV === 'LIVE';

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('trust proxy', 1);

app.use('/dispatch/v1.0/api', routes);

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

const server: any = app.listen(process.env.PORT || 3000, async () => {
  await new Promise<void>((resolve, reject) => {
    const migrate: any = exec('sequelize db:migrate', { env: process.env }, (err) =>
      err ? reject(err) : resolve()
    );

    /***Forward stdout+stderr to this process */
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
  const { port } = server.address() as AddressInfo;
  console.log(`Listening on port ${port}`);
});

export default app;
