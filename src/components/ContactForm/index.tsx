import { FC, lazy, Suspense } from 'react';
import { ContactProps } from './types';

const LazyContactForm = lazy(() => import(/* webpackChunkName: "LazyContactForm" */ './ContactForm'));

const ContactForm: FC<ContactProps> = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyContactForm {...props} />
  </Suspense>
);

export default ContactForm;