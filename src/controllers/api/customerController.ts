import { Request, Response } from 'express';
import { ResponseMessageKey } from '../../constants/responses';
import { sendErrorResponse, sendSuccessResponse } from '../../helpers/responseHelper';
import {
  customerUserList,
  createCustomer,
  findCustomerDetail,
  getCustomerDetails,
  updateCustomer,
  deleteCustomerUser,
} from '../../services/customerService';

export const listingCustomer = async (req: Request, res: Response) => {
  try {
    const pageNo = parseInt(req.body.page_no) || 1;
    const { name, sort_dir, sort_field } = req.body;
    const user_id = req.userId as unknown as number;
    const result = await customerUserList(pageNo, name, sort_dir, sort_field, user_id);
    if (typeof result === 'object' && 'error' in result) {
      return sendErrorResponse(req, res, 'Customer', result.error as ResponseMessageKey);
    }
    return sendSuccessResponse(req, res, 'Customer', 'ADMIN_LIST_FETCHED_SUCCESS', result);
  } catch (error) {
    return sendErrorResponse(req, res, 'Customer', 'GENERIC', error instanceof Error ? error : undefined);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, phone, address } = req.body;
    const id = req.userId as unknown as number;
    const result = await createCustomer(name, phone, address, id);
    if (typeof result === 'object' && 'error' in result) {
      return sendErrorResponse(req, res, 'Customer', result.error as ResponseMessageKey);
    }
    return sendSuccessResponse(req, res, 'Customer', 'ADMIN_CREATED', null);
  } catch (error) {
    return sendErrorResponse(req, res, 'Customer', 'GENERIC', error instanceof Error ? error : undefined);
  }
};

export const view = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await findCustomerDetail(+id);
    if (typeof result === 'object' && 'error' in result) {
      return sendErrorResponse(req, res, 'Customer', result.error as ResponseMessageKey);
    }

    return sendSuccessResponse(req, res, 'Customer', 'CUSTOMER_DETAIL_FETCHED_SUCCESS', result);
  } catch (error) {
    return sendErrorResponse(req, res, 'Customer', 'GENERIC', error instanceof Error ? error : undefined);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, address } = req.body;
    const result = await updateCustomer(+id, name, phone, address);
    if (typeof result === 'object' && 'error' in result) {
      return sendErrorResponse(req, res, 'Customer', result.error as ResponseMessageKey);
    }
    return sendSuccessResponse(req, res, 'Customer', 'CUSTOMER_DETAIL_UPDATE_SUCCESS', null);
  } catch (error) {
    return sendErrorResponse(req, res, 'Customer', 'GENERIC', error instanceof Error ? error : undefined);
  }
};

export const profile = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendErrorResponse(req, res, 'Customer', 'GENERIC');
  }
  try {
    const result = await getCustomerDetails(+userId);
    if (typeof result === 'object' && 'error' in result) {
      return sendErrorResponse(req, res, 'Customer', result.error as ResponseMessageKey);
    }
    return sendSuccessResponse(req, res, 'Customer', 'GET_PROFILE', result);
  } catch (error) {
    return sendErrorResponse(req, res, 'Customer', 'GENERIC');
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteCustomerUser(+id);
    if (typeof result === 'object' && 'error' in result) {
      return sendErrorResponse(req, res, 'Customer', result.error as ResponseMessageKey);
    }
    return sendSuccessResponse(req, res, 'Customer', result.success, null);
  } catch (error) {
    return sendErrorResponse(req, res, 'Customer', 'GENERIC', error instanceof Error ? error : undefined);
  }
};
