import { UseMutationOptions } from 'react-query';
import { ContactSchema, ContactsSchema } from './contacts.schema'
import z from 'zod'
import { AxiosError } from 'axios';

export type Contact = z.infer<typeof ContactSchema>;

export type ContactsResponse = z.infer<typeof ContactsSchema>;

export interface DeleteContactVariables
  extends Omit<
    UseMutationOptions<Contact | undefined, AxiosError<{ message: string }>, unknown, unknown>,
    'mutationFn' | 'mutationKey'
  > {}

export interface UpdateContactVariables
  extends Omit<
    UseMutationOptions<Contact | undefined, AxiosError<{ message: string }>, unknown, unknown>,
    'mutationFn' | 'mutationKey'
  > {}

export interface CreateContactVariables
  extends Omit<
    UseMutationOptions<Contact | undefined, AxiosError<{ message: string }>, unknown, unknown>,
    'mutationFn' | 'mutationKey'
  > {}