import { useParams } from "react-router-dom"
import ContactForm from "../../components/ContactForm"
import { useGetContacts } from "../../services/contacts"

const EditContact = () => {
  const { id } = useParams() as { id: string }
  const { contacts } = useGetContacts({ id })

  return (
    <ContactForm contact={contacts[0]} />
  )
}

export default EditContact