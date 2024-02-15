import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ContactProps, FormValues } from './types';
import { FC, useEffect } from 'react';
import { useCreateContact, useUpdateContact } from '../../services/contacts';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const ContactForm: FC<ContactProps> = ({ contact }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, reset, setError } = useForm<FormValues>({
    defaultValues: { email: '', firstName: '', lastName: '' },
    mode: 'onBlur'
  });

  const { mutateAsync: updateContact } = useUpdateContact({
    onSuccess(data) {
      if (data) {
        navigate('/')
      }
    },
  })

  const { mutateAsync: createContact } = useCreateContact({
    onSuccess(data) {
      if (data) {
        navigate('/')
      }
    },
    onError(error: AxiosError) {
      setError('email', {
        type: 'manual',
        message: error.response?.statusText || 'An error occurred'
      })
    }
  })

  useEffect(()=> {
    if (contact) reset({
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName
    })
  }, [contact, reset])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (contact) {
      await updateContact({ id: contact.id, ...data })
    } else {
      await createContact(data)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          rules={{ 
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            }
          }}
          render={({ field }) => (
            <>
              <input
                type="text"
                id="email"
                {...field}
                disabled={!!contact}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <span className="text-red-500">{errors.email?.message}</span>
            </>
          )}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
          First Name
        </label>
        <Controller
          name="firstName"
          control={control}
          rules={{ 
            required: { value: true, message: 'First Name is required' }, 
            minLength: { value: 3, message: 'First name should be at least 3 characters' },
            maxLength: { value: 25, message: 'First name should not exceed 25 characters' }
          }}
          render={({ field }) => (
            <>
              <input
                type="text"
                id="firstName"
                {...field}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <span className="text-red-500">{errors.firstName?.message}</span>
            </>
          )}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
          Last Name
        </label>
        <Controller
          name="lastName"
          control={control}
          rules={{ 
            required: false, 
            minLength: { value: 2, message: 'Last name should be at least 2 characters' },
            maxLength: { value: 30, message: 'Last name should not exceed 30 characters' }
          }}
          render={({ field }) => (
            <>
              <input
                type="text"
                id="lastName"
                {...field}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <span className="text-red-500">{errors.lastName?.message}</span>
            </>
          )}
        />
      </div>
      <div className='flex justify-between items-center'>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-4 hover:bg-gray-400 focus:outline-none focus:shadow-outline-blue"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
