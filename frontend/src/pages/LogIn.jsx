import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure, loginStart } from "../redux/User/userSlice.js";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state
      dispatch(loginStart());
      const res = await fetch('http://localhost:3000/api/v1/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("34",formData)
      console.log("35",res)
      const data = await res.json();
      console.log("36",data)

      if (data.success === false) {
        dispatch(loginFailure(data.message));
        setError(data.message); // Set error state
        setLoading(false); // Reset loading state
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      setError(error.message);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-indigo-800 to-fuchsia-700">
      <div className="max-w-md w-full px-6 py-8 border-2 border-black rounded-lg backdrop-blur-sm shadow-md">
        <div className="mb-8 text-center">
          <img className="h-16 mx-auto" src="/logo.svg" alt="Your Company" />
          <h2 className="mt-2 text-3xl font-bold text-black">Welcome Back!</h2>
          <p className="text-sm font-semibold text-black">
            Login to your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white font-medium"
                type="text"
                placeholder="Username or Email"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white font-medium"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
            >
              {loading ? "Loading..." : "Login"}
              <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </button>
            <div className="text-center">
              <p className="text-sm font-semibold text-black">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-black hover:text-gray-900"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </form>
        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    </section>
  );
}