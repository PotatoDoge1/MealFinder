import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.tsx'
import './index.css'
import ErrorPage from './pages/Error.tsx';
import Search from './pages/Search.tsx';
import Saved from './pages/Saved.tsx';
import Login from './pages/Login.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [

      {
        index: true,
        path: '/',
        element: <Search />,
      },

      {
        path: '/login',
        element: <Login />
      },

      {
        path: '/saved',
        element: <Saved />,
      },
      

    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
