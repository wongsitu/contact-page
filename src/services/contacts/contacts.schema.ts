import z from 'zod';

export const ContactSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional(),
});

export const ContactsSchema = z.array(ContactSchema);