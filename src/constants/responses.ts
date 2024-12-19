// src/constants/responseMessages.ts
export const RESPONSES = {
  SUCCESS: {
    LOGIN: 'Login successfully!',
    ADMIN_CREATED: 'Customer created successfully.',
    CUSTOMER_DETAIL_FETCHED_SUCCESS: 'Customer detail fetched successfully.',
    CUSTOMER_DETAIL_UPDATE_SUCCESS: 'Customer detail updated successfully.',
    USER_DETAIL_UPDATE_SUCCESS: 'User detail updated successfully.',
    GET_PROFILE: 'Profile details fetched successfully.',
    ADMIN_DELETE_SUCCESS: 'Customer deleted successfully.',
    ADMIN_LIST_FETCHED_SUCCESS: 'Customer list fetched successfully.',
  },
  ERROR: {
    GENERIC: 'Something went wrong.',
    TOKEN_EXPIRED: 'Your link is expired please try again.',
    NO_TOKEN_PROVIDED: 'No token provided!',
    INVALID_TOKEN: 'Token is invalid!',
    UNAUTHORIZED: 'Unauthorized!',
    USER_NOT_FOUND: 'User not found.',
    INVALID_CREDENTIALS: 'Invalid credentials.',
    EMAIL_ALREADY_EXIST: 'Email already exists.',
    ADMIN_FAILED_TO_CREATE: 'Customer failed to create.',
    CUSTOMER_NOT_FOUND: 'Customer not found.',
    CUSTOMER_DETAIL_UPDATE_FAILED: 'Customer detail failed to update.',
    ADMIN_DELETE_FAILED: 'Customer failed to delete.',
  },
} as const;

export type ResponseMessageKey = keyof typeof RESPONSES.SUCCESS | keyof typeof RESPONSES.ERROR;
