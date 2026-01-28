import pinoHttp from "pino-http";
import logger from "../utils/logger";
import requestId from "./requestId.middleware";
const httpLogger = pinoHttp({
  logger,
  customProps: (req, res) => ({
    requestId: req.requestId,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userId: req.user._id || "ananymous",
    endpoints: `${req.method} ${req.originalUrl}`,
  }),
  customSuccessMessage: (req, res) =>
    `${req.method} ${req.originalUrl} completed`,
  customErrorMessage: (req, res, err) =>
    `${req.method} ${req.originalUrl} failed`,
});
export default httpLogger;
