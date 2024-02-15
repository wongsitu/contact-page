import { Link } from 'react-router-dom';
import { useDeleteContact, useGetContacts } from '../../services/contacts';

const MainPage = () => {
  const { contacts, refetch } = useGetContacts()
  const { mutateAsync: deleteContact } = useDeleteContact({
    onSuccess: (data) => {
      if (data) {
        refetch()
      }
    }
  })

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-2xl font-bold">Contact List</h2>
        <Link to="/create">
          <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue">
            Add Contact
          </button>
        </Link>
      </div>
      {contacts.map((contact) => (
        <div key={contact.id} className="mb-4 border-b py-2">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold">{contact.firstName} {contact.lastName}</p>
              <p className="text-gray-600">{contact.email}</p>
            </div>
            <div className='flex items-center gap-4'>
              <Link to={`/edit/${contact.id}`}>
                <button 
                  type="button" 
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                  Edit
                </button>
              </Link>
              <button 
                type="button" 
                onClick={() => deleteContact({ id: contact.id })} 
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
