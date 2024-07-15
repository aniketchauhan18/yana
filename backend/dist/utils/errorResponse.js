"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEntityResponse =
  exports.entityDeletedSuccessfully =
  exports.entityNotFound =
  exports.entityUpdatedSuccessfully =
  exports.entityCreatedSuccessfully =
  exports.entityAlreadyExists =
  exports.InvalidRequestBody =
  exports.InternalServerError =
    void 0;
const sendError = ({ res, statusCode, message }) => {
  return res.status(statusCode).json({ error: message });
};
const sendSuccess = ({ res, statusCode, message }) => {
  return res.status(statusCode).json({ message: message });
};
const sendResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data: data });
};
const InternalServerError = (res) => {
  return sendError({ res, statusCode: 500, message: "Internal Server Error" });
};
exports.InternalServerError = InternalServerError;
const InvalidRequestBody = (res) => {
  return sendError({ res, statusCode: 400, message: "Invalid Request Body" });
};
exports.InvalidRequestBody = InvalidRequestBody;
const entityAlreadyExists = (res, entity) => {
  return sendError({
    res,
    statusCode: 400,
    message: `${entity} already exists`,
  });
};
exports.entityAlreadyExists = entityAlreadyExists;
const entityCreatedSuccessfully = (res, entity) => {
  return sendSuccess({
    res,
    statusCode: 201,
    message: `${entity} created successfully`,
  });
};
exports.entityCreatedSuccessfully = entityCreatedSuccessfully;
const entityUpdatedSuccessfully = (res, entity) => {
  return sendSuccess({
    res,
    statusCode: 200,
    message: `${entity} updated successfully`,
  });
};
exports.entityUpdatedSuccessfully = entityUpdatedSuccessfully;
const entityNotFound = (res, entity) => {
  return sendError({
    res,
    statusCode: 404,
    message: `${entity} does not exist`,
  });
};
exports.entityNotFound = entityNotFound;
const entityDeletedSuccessfully = (res, entity) => {
  return sendSuccess({
    res,
    statusCode: 200,
    message: `${entity} deleted successfully`,
  });
};
exports.entityDeletedSuccessfully = entityDeletedSuccessfully;
const sendEntityResponse = (res, data) => {
  return sendResponse(res, 200, data);
};
exports.sendEntityResponse = sendEntityResponse;
//# sourceMappingURL=errorResponse.js.map
