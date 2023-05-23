import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TestPage, Login, HomePage, Register, ImageUploadForm } from "../UI/pages/users";
import PrivateRoutes from "./RouteTypes";


const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/',
      element: <PrivateRoutes><HomePage /></PrivateRoutes>
    },
    {
      path: '/test',
      element: <PrivateRoutes><TestPage /></PrivateRoutes>
    },
    {
      path: '/upload',
      element: <PrivateRoutes><ImageUploadForm /></PrivateRoutes>
    },
  ]);
  
  export default function Router() {
    return <RouterProvider router={router} />;
  }