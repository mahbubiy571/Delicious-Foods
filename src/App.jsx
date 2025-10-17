import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayout";
import { login, logout, isAuthReady } from "./app/features/userSlice";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import { Home, CreateRecipe, RecipeDetail, Recipes } from "./pages/index";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        dispatch(
          login({
            uid: u.uid,
            displayName: u.displayName,
            email: u.email,
            photoURL: u.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
      dispatch(isAuthReady());
    });

    return () => unsub();
  }, [dispatch]);

  if (!authReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-indigo-700 font-semibold text-lg">Loading...</p>
      </div>
    );
  }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/createrecipe",
          element: <CreateRecipe />,
        },
        {
          path: "/recipe/:id",
          element: <RecipeDetail />,
        },
        {
          path: "/recipes",
          element: <Recipes />,
        },
      ],
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: registerAction,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
