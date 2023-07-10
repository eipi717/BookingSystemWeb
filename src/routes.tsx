import {createBrowserRouter, Link, Navigate, RouterProvider, useNavigate} from "react-router-dom";
import { BookingTable } from "./modules/booking/components/BookingTable";
import App from "./App";
import { Error } from "./modules/error/components/error";
import { CreateBooking } from "./modules/booking/components/CreateBooking";
import { EditBooking } from "./modules/booking/components/EditBooking";
import { LessonTable } from "./modules/lesson/components/LessonTable";
import { Login } from "./modules/auth/components/login";
import {useEffect, useState} from "react";
import { AuthContext } from "./modules/auth/components/AuthContext";
import { HomePage } from "./modules/common/components/HomePage";
import {validateToken} from "./modules/common/requests/request";
import {CreateLessons} from "./modules/lesson/components/CreateLessons";
import {Spinner} from "./modules/common/components/Spinner";

const router = createBrowserRouter([
  {
    path: "booking",
    element: <App />,
    children: [
      {
        path: "",
        element: <BookingTable />
      },
      {
        path: "createBooking",
        element: <CreateBooking />
      },
      {
        path: "editBooking/:id",
        element: <EditBooking />
      }
    ]
  },
  {
    path: "lesson",
    element: <App />,
    children: [
      {
        path: "",
        element: <LessonTable />
      },
      {
        path: "createLesson",
        element: <CreateLessons />
      },
      {
        path: "editLesson/:id",
        element: <EditBooking />
      }
    ]
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />
      }
    ]
  },
  {
    path: "/error",
    element: <Error />
  }
]);

const privateRouter = createBrowserRouter([
  {
    path: "/*",
    element: <Login />
  },
  {
    path: "/error",
    element: <Error />
  }
]);

const Routes = () => {
  const [user, setUser] = useState<string>("");

  const [isAuth, setIsAuth] = useState(false);

  const [isValidToken, setIsValidToken] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState(true);

  const token = (localStorage.getItem("token") || "") === "" ? "loggedOut" : localStorage.getItem("token") || ""
  useEffect( () => {
    validateToken(token)
        .then( ( response ) => {
          setIsValidToken(response.valid)
          setUser(response.userName)
        })
        .catch( ( error ) => {
          setIsAuth(false)
        })
        .finally(() => {
          setIsLoading(false);
        })
  }, [])

  const editIsAuth = (isAuth: boolean) => { setIsAuth(isAuth) }

  const setUserName = (username: string) => { setUser(username) }

  if (isLoading) { return <Spinner /> }


  return (
    <AuthContext.Provider value={{isAuth: isAuth, setIsAuth: editIsAuth, user: user, setUser: setUserName}}>
      {(isAuth || isValidToken) ? (<RouterProvider router={router} />) : (<RouterProvider router={privateRouter} />)}
    </AuthContext.Provider>
  );
}

export { Routes };