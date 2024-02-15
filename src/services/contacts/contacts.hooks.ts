import { useMutation, useQuery } from "react-query";
import { ContactsResponse, CreateContactVariables, DeleteContactVariables, UpdateContactVariables } from "./types";
import { getContacts, deleteContact, updateContact, createContact } from "./contacts.requests";

export const useGetContacts = ({ id }: { id?: string } = {}) => {
  const { data, status, refetch } = useQuery<ContactsResponse>(['getContacts', { id }], getContacts)

  return { contacts: data || [], status, refetch }
};

export const useDeleteContact = ({ ...opts }: DeleteContactVariables = {}) => {
  return useMutation('deleteContact', deleteContact, {...opts})
};

export const useUpdateContact = ({ ...opts }: UpdateContactVariables = {}) => {
  return useMutation('updateContact', updateContact, {...opts})
};

export const useCreateContact = ({ ...opts }: CreateContactVariables = {}) => {
  return useMutation('createContact', createContact, {...opts})
};