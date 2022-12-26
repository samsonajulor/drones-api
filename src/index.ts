import { AddressInfo } from 'net';
import { exec } from 'child_process';
import { logger } from './config';
import app from './app';

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
