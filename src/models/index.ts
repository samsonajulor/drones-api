import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { DBConfiguration } from '../config';

const env = process.env.NODE_ENV || 'development';

const config = DBConfiguration[env as keyof typeof DBConfiguration];

const basename = path.basename(__filename);

const db = {} as any;

let sequelize: any;
if (config.dbUrl) {
  sequelize = new Sequelize(config.dbUrl, config as object);
} else {
  sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string,
    config as object
  );
}

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts';
  })
  .forEach((file: any) => {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
