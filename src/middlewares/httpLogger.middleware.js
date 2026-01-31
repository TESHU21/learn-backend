import pinoHttp from "pino-http";
import logger from "../utils/logger.js";

const httpLogger = pinoHttp({
  logger,

  customProps: (req) => ({
    requestId: req.requestId,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userId: req.user?._id ?? "anonymous",
    endpoint: `${req.method} ${req.originalUrl}`,
  }),

  customSuccessMessage: (req) => `${req.method} ${req.originalUrl} completed`,

  customErrorMessage: (req) => `${req.method} ${req.originalUrl} failed`,
});

export default httpLogger;
