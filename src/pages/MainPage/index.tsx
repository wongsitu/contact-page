import { lazy, Suspense } from 'react';

const LazyMainPage = lazy(() => import(/* webpackChunkName: "LazyMainPage" */ './MainPage'));

const MainPage = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyMainPage {...props} />
  </Suspense>
);

export default MainPage;