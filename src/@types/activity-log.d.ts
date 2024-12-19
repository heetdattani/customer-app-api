declare module 'activity' {
  export interface ActivityLogAttributesInterface {
    id: number;
    account_id: number | null;
    log_data?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }
}
