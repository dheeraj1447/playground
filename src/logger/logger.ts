import { createLogger, transports, format } from 'winston';

const { combine, timestamp, prettyPrint, colorize, errors,  } = format;
 
export const logger = createLogger({
  level: 'silly',
  format: combine(
    errors({ stack: true }), // <-- use errors format
    colorize(),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console()
  ],
});
