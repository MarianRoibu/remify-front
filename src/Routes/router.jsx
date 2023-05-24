import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TestPage, Login, HomePage, Register, ImageUploadForm, ProfilePage,ImagePage, GifPage} from "../UI/pages/users";
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
      path: '/imagefull/:id',
      element: <ImagePage />
    },
    {
      path: '/giffull/:id',
      element: <GifPage />
    },
    {
      path: '/',
      element: <HomePage />
    },

    {
      path: '/test',
      element: <PrivateRoutes><TestPage /></PrivateRoutes>
    },
    {
      path: '/upload',
      element: <PrivateRoutes><ImageUploadForm /></PrivateRoutes>
    },
    {
      path: '/profile',
      element: <PrivateRoutes><ProfilePage /></PrivateRoutes>
    },
  ]);
  
  export default function Router() {
    return <RouterProvider router={router} />;
  }