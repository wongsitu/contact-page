import { Contact } from "../../services/contacts";

export type FormValues = Omit<Contact, 'id'>;

export type ContactProps = {
  contact?: Contact
};