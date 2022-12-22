import { createLogger, format, transports } from 'winston';
import moment from 'moment';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(
  ({ level, message, label, timestamp }) => `${timestamp} || [${label}] || ${level}: ${message}`
);

const logger = async (action: string, message: string) => {
  const logger = createLogger({
    format: combine(label({ label: `tracking action: ${action}` }), timestamp(), myFormat),
    transports: [
      new transports.Console(),
      new transports.File({ filename: `./logs/${action}/${moment().format('DD-MM-YYYY')}.log` }),
    ],
  });

  logger.log({ level: 'info', message });
};

export default logger;
