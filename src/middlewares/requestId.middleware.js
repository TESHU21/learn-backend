import { randomUUID } from "crypto";
const requestId = (req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  next();
};
export default requestId;
