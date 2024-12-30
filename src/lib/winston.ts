import { createLogger, format } from "winston";
import { Console, File } from "winston/lib/winston/transports";

const production = [
  new Console({
    format: format.json(),
    level: "http",
  }),
  new File({
    filename: "server.log",
    level: "http",
    format: format.json(),
  }),
];

const development = [
  new Console({
    format: format.json(),
    level: "debug",
  }),
];

const logger = createLogger({
  level: "info",
  transports: process.env.NODE_ENV === "production" ? production : development,
});

export { logger };
