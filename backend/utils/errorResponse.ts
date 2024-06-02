import { Response } from "express"

interface ResponseParams {
  res: Response,
  statusCode: number,
  message: string
}

const sendError = ({ res, statusCode, message }: ResponseParams) => {
  return res.status(statusCode).json({error: message})
}

const sendSuccess = ({ res, statusCode, message }: ResponseParams) => {
  return res.status(statusCode).json({message: message})
}

const sendResponse = (res: Response, statusCode: number, data: object) => {
  return res.status(statusCode).json({data: data})
}

export const InternalServerError = (res: Response) => {
  return sendError({res, statusCode: 500, message: 'Internal Server Error'})
}

export const InvalidRequestBody = (res: Response) => {
  return sendError({res, statusCode: 400, message: 'Invalid Request Body'})
}

export const entityAlreadyExists = (res: Response, entity: string) => {
  return sendError({res, statusCode: 400, message: `${entity} already exists`})
}

export const entityCreatedSuccessfully = (res: Response, entity: string) => {
  return sendSuccess({res, statusCode: 201, message: `${entity} created successfully`})
}
export const entityUpdatedSuccessfully = (res: Response, entity: string) => {
  return sendSuccess({res, statusCode: 200, message: `${entity} updated successfully`})
}

export const entityNotFound = (res: Response, entity: string) => {
  return sendError({res, statusCode: 404, message: `${entity} does not exist`})
}

export const entityDeletedSuccessfully = (res: Response, entity: string) => {
  return sendSuccess({res, statusCode: 200, message: `${entity} deleted successfully`})
}

export const sendEntityResponse = (res: Response, data: object) => {
  return sendResponse(res, 200, data)
}
