import { Customer } from '../models'; // Ensure correct paths to models
import { createPaginationResults } from '../helpers/paginationHelper';
import AppDataSource from '../config/ormconfig';
import { Like, Not } from 'typeorm';

const customerRepository = AppDataSource.getRepository(Customer);

export const getCustomerDetails = async (id: number) => {
  const customer = await customerRepository.findOne({
    where: { id },
  });

  if (!customer) return { error: 'USER_NOT_FOUND' };

  return {
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    address: customer.address
  };
};

async function tofindCustomerById(id: number) {
  return await customerRepository.findOne({
    where: { id },
    select: ['id', 'name', 'phone', 'address'], // Select necessary fields
  });
}


const getQueryAndSortFields = (name: string, sort_dir: string, sort_field: string) => {
  const search_name = name.trim();
  let sortOrder;
  if (sort_dir) { 
    sortOrder = sort_dir === 'desc' ? 'DESC' : 'ASC';
  } else{ 
    sortOrder = 'DESC';
  }
  

  let query: any = {};
  if (search_name) query.name = Like(`%${search_name}%`); // Use Like for TypeORM

  let sortFields: string;
  switch (sort_field) {
    case 'name':
      sortFields = 'name';
      break;
    default:
      sortFields = 'createdAt'; // Default sorting field
      break;
  }

  return { query, sortFields, sortOrder };
};


export const customerUserList = async (
  pageNo: number,
  name: string,
  sort_dir: string,
  sort_field: string,
  user_id: number
) => {
  try {
    const limit = 5;

    // Prepare sorting fields
    const { query, sortFields, sortOrder } = getQueryAndSortFields(name, sort_dir, sort_field);

    let whereClause: any = { ...query, user_id: {
      id: user_id
    } }; // Start with the query object


    const [rows, count] = await customerRepository.findAndCount({
      select: ['id', 'name', 'phone', 'address', 'createdAt'], // Select only needed fields
      where: whereClause,
      order: {
        [sortFields]: sortOrder, // Ensure the field exists
      },
      skip: (pageNo - 1) * limit, // Pagination: skip for current page
      take: limit, // Limit number of results
    });

    return createPaginationResults(rows, count, count, pageNo, limit);
  } catch (error) {
    console.error('Error fetching customer user list:', error); // Logging error for debugging
    return { error: 'FETCH_FAILED' }; // Return a generic error
  }
};

// create customer
export const createCustomer = async (name: string, phone: string, address: string, user_id: number) => {
  try {

    const customerAdd = customerRepository.create({
      name,
      phone,
      address,
      user_id: {
        id: user_id
      },
    });
    await customerRepository.save(customerAdd); // Save the new customer

    return true;
  } catch (error) {
    console.error('Error creating customer:', error); // Improved error logging
    return { error: 'TRANSACTION_FAILED' };
  }
};

// create customer
export const findCustomerDetail = async (id: number) => {
  try {
    const userFound = await tofindCustomerById(id);
    if (!userFound) return { error: 'CUSTOMER_NOT_FOUND' };
    return userFound; // TypeORM returns the entity directly
  } catch (error) {
    console.error('Error finding customer detail:', error); // Logging error for debugging
    return { error: 'GENERIC' };
  }
};

export const updateCustomer = async (
  id: number,
  name: string,
  phone: string,
  address: string,
) => {
  const userFound = await tofindCustomerById(id);
  if (!userFound) return { error: 'CUSTOMER_NOT_FOUND' };

  const requestParam = {
    name,
    phone,
    address
  };

  await customerRepository.update(id, requestParam); // Update the customer
  return true;
};

export const deleteCustomerUser = async (id: number) => {
  const userFound = await tofindCustomerById(id);
  if (!userFound) return { error: 'CUSTOMER_NOT_FOUND' };

  const delMessage = await customerRepository.delete(id); // Use delete method

  if (delMessage.affected) {
    return { success: 'CUSTOMER_DELETE_SUCCESS' };
  } else {
    console.error('Delete failed for customer ID:', id); // Improved logging for debugging
    return { error: 'CUSTOMER_DELETE_FAILED' };
  }
};
