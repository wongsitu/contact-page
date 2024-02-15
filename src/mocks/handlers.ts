import { http, HttpResponse } from 'msw'
import { db } from './db'
import { Contact } from '../services/contacts/types'
import { v4 as uuidv4 } from 'uuid';

export const handlers = [
  http.get('/contacts', async ({ request }) => {
    const url = new URL(request.url)
    const contactId = url.searchParams.get('id')

    if (contactId) {
      const response = db.contacts.findFirst({
        where: {
          id: {
            equals: contactId
          }
        }
      })

      if (!response) {
        return new HttpResponse(null, { status: 404, statusText: 'Contact not found' })
      }

      return HttpResponse.json([response])
    }

    const response = db.contacts.getAll()

    return HttpResponse.json(response)
  }),
  http.post('/contacts', async ({ request }) => {
    const data = await request.json() as Omit<Contact, 'id'> | null

    if (!data) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad request' })
    }

    const exstingContact = db.contacts.findFirst({
      where: {
        email: {
          equals: data.email
        }
      }
    })

    if (exstingContact) {
      return new HttpResponse(null, { status: 400, statusText: 'Contact already exists' })
    }

    const contact = db.contacts.create({
      id: uuidv4(),
      ...data
    })

    return HttpResponse.json(contact)
  }),
  http.delete('/contacts/:id', ({ params }) => {
    if (!params['id']) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad request'})
    }

    const contact = db.contacts.delete({
      where: {
        id: {
          equals: params['id'] as string
        }
      }
    })

    if (!contact) {
      return new HttpResponse(null, { status: 404, statusText: 'Contact not found'})
    }

    return HttpResponse.json(contact)
  }),
  http.put('/contacts/:id', async ({ params, request }) => {
    if (!params['id']) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad request'})
    }

    const contact = await request.json() as Partial<Omit<Contact, 'id'>> | null

    if (!contact) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad request' })
    }

    const prevContact = db.contacts.findFirst({
      where: {
        id: {
          equals: params['id'] as string
        }
      }
    })

    const newContact = db.contacts.update({
      where: {
        id: {
          equals: params['id'] as string
        }
      },
      data: {
        ...prevContact,
        ...contact,
      }
    })

    return HttpResponse.json(newContact)
  }),
]
