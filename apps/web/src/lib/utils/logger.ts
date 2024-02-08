import { createLogger, type LogOptions, type LogType } from "vite";

interface Logger {
  log: (level: LogType, options: LogOptions, { message, error }: { message?: string; error?: Error }) => any;
  createLevelLogger: (
    level: LogType,
  ) => ({ message, error }: { message?: string; error?: Error }, options?: LogOptions) => any;
  [key: string]: any;
}

export const logger: Logger = {
  log: (level: LogType, options: LogOptions, { message, error }: { message?: string; error?: Error }) => {
    const dedicatedLogger = createLogger(level, { prefix: `[${level}]` });

    const logMessage = `${(message || "") + ":"}\n${error?.stack || ""}`;

    dedicatedLogger[level](logMessage, { timestamp: true, ...options });

    return dedicatedLogger;
  },
  createLevelLogger: (level: LogType) => {
    return ({ message, error }: { message?: string; error?: Error }, options?: LogOptions) => {
      return logger.log(level, { ...options }, { message, error });
    };
  },
};

(["info", "warn", "error"] as Array<LogType>).forEach((level: LogType) => {
  logger[level] = logger.createLevelLogger(level);
});
