import { Form, Link, useActionData } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { formError } from "../components/ErrorId";
import { useGoogle } from "../hooks/useGoogle";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();
  const {
    googleProvider,
    isPending: isPendingGoogle,
    error: errorGoogle,
  } = useGoogle();

  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password)
        .then(() => toast.success("Ro‘yxatdan muvaffaqiyatli o‘tdingiz!"))
        .catch((err) =>
          toast.error(err?.message || "Ro‘yxatdan o‘tishda xatolik")
        );
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
      <div className="backdrop-blur-md bg-gray-800/60 shadow-2xl rounded-2xl p-8 w-100 max-w-md border border-gray-700 mx-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Register
        </h1>

        <Form method="post" className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className="bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />

          {!isPending ? (
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition"
            >
              Register
            </button>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 bg-indigo-400 text-white font-semibold py-2.5 rounded-lg cursor-not-allowed"
            >
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Loading...
            </button>
          )}
        </Form>

        <div className="mt-6 flex flex-col gap-3">
          <p className="text-center text-gray-400 text-sm font-medium">
            Or sign up with
          </p>

          {!isPendingGoogle ? (
            <button
              type="button"
              onClick={googleProvider}
              className="w-full flex items-center justify-center gap-2 bg-gray-900/70 border border-gray-700 rounded-lg py-2.5 hover:bg-gray-800 transition"
            >
              <FcGoogle className="w-6 h-6" />
              <span className="font-medium text-gray-200">
                Continue with Google
              </span>
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-700 text-gray-400 rounded-lg py-2.5 cursor-not-allowed"
            >
              Loading...
            </button>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-center mt-3 text-sm">{error}</div>
        )}
        {_error && (
          <div className="text-red-500 text-center mt-3 text-sm">{_error}</div>
        )}
        {errorGoogle && (
          <div className="text-red-500 text-center mt-3 text-sm">
            {errorGoogle}
          </div>
        )}

        <p className="text-center mt-4 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
