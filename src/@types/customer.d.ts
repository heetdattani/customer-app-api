declare module 'customer' {
  export interface CustomerAttributesInterface {
    id: number;
    name: string;
    phone: string;
    address: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }
}
