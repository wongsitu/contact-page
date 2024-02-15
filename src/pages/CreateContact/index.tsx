import { lazy, Suspense } from 'react';

const LazyCreateContact = lazy(() => import(/* webpackChunkName: "LazyCreateContact" */ './CreateContact'));

const CreateContact = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyCreateContact {...props} />
  </Suspense>
);

export default CreateContact;