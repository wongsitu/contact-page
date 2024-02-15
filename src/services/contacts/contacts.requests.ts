import axios from 'axios';
import { MutationFunction, QueryFunction, QueryKey } from 'react-query'
import { ContactsResponse, Contact } from './types'
import { ContactsSchema, ContactSchema } from './contacts.schema';

export const getContacts: QueryFunction<ContactsResponse, QueryKey> = async ({ queryKey }) => {
  const [, { id }] = queryKey as [string, { id?: string }];

  return axios.get(`/contacts`, { params: { id } }).then((response) => ContactsSchema.parse(response.data))
};

export const createContact: MutationFunction<Contact, Omit<Contact, 'id'>> = async (payload) => {
  return axios.post('/contacts', payload).then((response) => ContactSchema.parse(response.data));
}

export const deleteContact: MutationFunction<Contact, { id: string }> = async ({ id }) => {  
  return axios.delete(`/contacts/${id}`).then((response) => ContactSchema.parse(response.data));
}

export const updateContact: MutationFunction<Contact, Contact> = async ({ id, ...rest }) => {
  return axios.put(`/contacts/${id}`, rest).then((response) => ContactSchema.parse(response.data));
}
