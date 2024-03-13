import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";

// import { app } from "../firebase/firebase.js";
import OAuth from "../components/OAuth.jsx";
import storeImageOnFirebase from "../firebase/storeImageOnFirebase.js";

export default function LogIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-fuchsia-700 flex justify-center h-screen ">
      <section className="p-2">
        <div className="flex items-center justify-center border-2 border-black rounded-lg backdrop-blur-sm sm:px-6 sm:py-8 lg:px-8 ]">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2">
              <img
                className=" h-14 w-auto"
                src="/logo.svg"
                alt="Your Company"
              />
            </div>
            <h2 className="text-2xl font-bold leading-tight text-black">
              Sign up to create account
            </h2>
            <p className="mt-2 text-base text-slate-300">
              Already have an account?{" "}
              <a
                href="#"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                LogIn
              </a>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                
                <div className="">
                  <div>
                    <label
                      htmlFor="username"
                      className="text-base font-bold text-gray-900"
                    >
                      {" "}
                      UserName Or Email
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white font-medium"
                        type="text"
                        placeholder="username, or email"
                        id="username"
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
            
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-bold text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white font-medium"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    {loading ? "Loading..." : "Get started"}{" "}
                    <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                or
              </p>
            </div>
            <div className="mt-3 space-y-3">
              <OAuth/>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400  px-3.5 py-2.5 font-semibold text-gray-900 transition-all duration-200  hover:text-slate-950 hover:bg-white/95 hover:font-bold focus:text-black focus:outline-none backdrop-blur-sm"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6"
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="512.000000pt"
                    height="512.000000pt"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path
                        d="M2360 5049 c-154 -11 -357 -47 -516 -93 -902 -259 -1603 -1017 -1790
-1934 -136 -669 -8 -1355 354 -1908 255 -390 580 -686 968 -886 141 -73 341
-154 403 -164 58 -9 109 19 133 73 18 40 18 60 12 286 l-7 243 -86 -14 c-97
-15 -256 -9 -386 13 -105 19 -211 71 -278 139 -53 53 -67 76 -136 229 -63 139
-135 231 -232 297 -66 46 -121 106 -117 128 6 30 48 43 121 38 141 -10 288
-113 393 -274 72 -110 143 -179 230 -222 62 -31 79 -35 169 -38 103 -4 207 12
291 44 41 16 43 18 58 85 19 86 56 164 106 228 l39 49 -82 11 c-264 38 -452
102 -627 215 -229 148 -365 379 -431 731 -20 109 -23 389 -5 492 29 167 98
319 200 445 l45 55 -20 62 c-52 168 -42 372 28 574 18 50 22 52 103 48 118 -6
371 -108 543 -218 l71 -46 56 11 c30 6 87 18 127 27 271 58 655 58 926 0 40
-9 97 -21 127 -27 l55 -10 95 58 c226 137 484 230 575 206 26 -7 33 -17 53
-75 43 -125 55 -210 50 -351 -4 -95 -11 -148 -26 -195 l-21 -64 44 -54 c89
-109 155 -244 192 -389 22 -89 25 -417 4 -544 -32 -198 -114 -406 -210 -532
-165 -217 -464 -366 -843 -418 l-87 -12 39 -49 c47 -60 85 -137 106 -221 14
-52 17 -137 20 -503 5 -490 5 -489 72 -521 46 -21 83 -15 229 42 738 284 1320
932 1533 1703 141 513 111 1108 -80 1601 -172 440 -475 842 -848 1122 -405
303 -865 474 -1367 507 -175 12 -192 12 -375 0z"
                      />
                    </g>
                  </svg>
                </span>
                Continue with GitHub
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
