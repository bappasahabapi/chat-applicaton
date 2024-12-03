import { Link, useNavigate } from "react-router-dom";
import blankImage from "../assets/images/blank.svg";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import Error from "../components/ui/Error";
import InputField from "../components/ui/InputFiled";

export default function Login() {


  const [credentials, setCredentials] = useState({
    email: "bappa@gmail.com",
    password: "12345",
  });
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();
  const navigate = useNavigate();

  // Handle api response:  data post hbr por tar response k dorte  useEffect
  useEffect(() => {

    if (responseError?.data) {
      setError(responseError.data);
    }
    else if (data?.accessToken && data?.user) {
      navigate("/inbox");
    }
  }, [data, responseError, navigate]);

   // Handle form input changes
  const handleInputChange =(e)=>{
    const {name,value}=e.target;
    setCredentials((pre)=>({
      ...pre,
      [name]:value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    login(credentials);
  };

  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img className="mx-auto h-12 w-auto" src={blankImage} alt="" />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <small>email: <b>bappa@gmail.com</b> </small> <br />
            <small>pass: <b>12345</b> </small>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={credentials.email}
                onChange={handleInputChange}

              />
              <InputField
                 id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}

              />
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Register
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>

            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </div>
    </div>
  );
}
