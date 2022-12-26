import { AddressInfo } from 'net';
import { exec } from 'child_process';
import { Request, Response, NextFunction } from 'express';
import { logger } from './config';
import app from './app';
import errorhandler from 'errorhandler';
import { env } from './config';
import { droneController } from './controllers';

const production = env.ENV === 'LIVE';
const { audit } = droneController;

/**call the audit method every 24hours */
setInterval(audit, 86400000);

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
    const migrate: any = exec('npx sequelize-cli db:migrate', { env: process.env }, (err) =>
      err ? reject(err) : resolve()
    );
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
    const seed: any = exec('npx sequelize-cli db:seed:all', { env: process.env }, (err) =>
      err ? logger('create dev db', 'seed already exists. Skipping seeding...') : resolve()
    );
    seed.stdout.pipe(process.stdout);
    // seed.stderr.pipe(process.stderr);
  });
  const { port } = server.address() as AddressInfo;
  console.log(`Listening on port ${port}`);
});

export default app;
