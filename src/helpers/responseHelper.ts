import { Request, Response } from 'express';
import { RESPONSES } from '../constants/responses';
import logger from '../logger';
import { getRepository } from 'typeorm';

interface ResponseData {
  status: boolean;
  message: string;
  data?: any;
}

// Helper function to capture activity log
const captureActivityLog = async (
  req: Request | undefined,
  moduleName: string | undefined,
  message: string,
  statusCode: number,
  errorStack: string | null = null,
  errorMessage: string | null = null,
) => {
  const ip = req?.socket.remoteAddress ?? 'Unknown'; // Get the IP address
  let deviceType = 'Unknown';
  if (req?.useragent?.isMobile) {
    deviceType = 'Mobile';
  } else if (req?.useragent?.isTablet) {
    deviceType = 'Tablet';
  } else if (req?.useragent?.isDesktop) {
    deviceType = 'Desktop';
  }

  const platform = req?.useragent?.platform || 'Unknown'; // Android, iOS, etc.
  const browser = req?.useragent?.browser || 'Unknown'; // Chrome, Edge, etc.

  const details = {
    date: new Date(),
    module_name: moduleName ?? 'Unknown',
    account_number: req?.userId ?? null,
    device_type: deviceType,
    ip,
    platform,
    browser,
    request: req?.body,
    status: statusCode,
    message,
    trace_error: errorStack,
    trace_message: errorMessage,
  };

  // Create a new instance of ActivityLog
  // const activityLog = new ActivityLog();
  // activityLog.account_id = req?.userId ? +req.userId : null; // Ensure account_id is a number or null
  // activityLog.log_data = details; // Assign the log data

  // // Get the ActivityLog repository
  // const activityLogRepository = getRepository(ActivityLog);

  // // Save the activity log to the database
  // await activityLogRepository.save(activityLog);

  return true;
};

export const sendSuccessResponse = async (
  req: Request,
  res: Response,
  moduleName: string,
  messageKey: string,
  data: any = null,
  statusCode: number = 200,
) => {
  const message = RESPONSES.SUCCESS[messageKey as keyof typeof RESPONSES.SUCCESS] || messageKey;
  const response: ResponseData = { status: true, message, data };

  // Capture activity log using the helper function
  await captureActivityLog(req, moduleName, message, statusCode);
  return res.status(statusCode).json(response);
};

export const sendErrorResponse = async (
  req?: Request | undefined,
  res?: Response | undefined,
  moduleName?: string,
  messageKey?: string,
  error?: Error,
  data: any = null,
  statusCode: number = 500,
) => {
  const message = RESPONSES.ERROR[messageKey as keyof typeof RESPONSES.ERROR] || messageKey;
  const response: ResponseData = { status: false, message, data };

  const requestId = req?.headers['x-request-id'] ?? 'N/A';
  const method = req?.method ?? 'N/A';
  const url = req?.url ?? 'N/A';
  const body = JSON.stringify(req?.body ?? {});
  const query = JSON.stringify(req?.query ?? {});
  const errorStack = error?.stack ?? 'N/A';
  const errorMessage = error?.message ?? 'N/A';

  const logMessage = `Request ID: ${requestId} - ${method} ${url} - ${body} - ${query}`;

  if (error) {
    logger.error(`${logMessage} - Message: ${errorMessage} - Stack Trace: ${errorStack}`);
  } else {
    logger.error(`${logMessage} - MessageKey: ${messageKey}`);
  }

  // Capture activity log using the helper function
  await captureActivityLog(req, moduleName, message, statusCode, errorStack, errorMessage);

  res?.status(statusCode).json(response);
};
