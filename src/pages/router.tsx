import { createBrowserRouter } from "react-router-dom";
import MainPage from './MainPage';
import EditContact from './EditContact';
import CreateContact from './CreateContact';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/edit/:id",
    element: <EditContact />,
  },
  {
    path: "/create",
    element: <CreateContact />,
  },
]);