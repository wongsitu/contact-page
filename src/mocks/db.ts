import { faker } from '@faker-js/faker';
import { factory, nullable, primaryKey } from '@mswjs/data'
import { v4 as uuidv4 } from 'uuid';

export const db = factory({
  contacts: {
    id: primaryKey(String),
    email: String,
    firstName: String,
    lastName: nullable(String),
  },
})

db.contacts.create({
  id: uuidv4(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
})

db.contacts.create({
  id: uuidv4(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
})

db.contacts.create({
  id: uuidv4(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
})

db.contacts.create({
  id: uuidv4(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
})

