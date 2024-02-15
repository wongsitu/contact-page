import { lazy, Suspense } from 'react';

const LazyEditContact = lazy(() => import(/* webpackChunkName: "LazyEditContact" */ './EditContact'));

const EditContact = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyEditContact {...props} />
  </Suspense>
);

export default EditContact;