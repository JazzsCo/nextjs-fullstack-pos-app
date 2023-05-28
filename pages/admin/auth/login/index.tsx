// import {
//   Alert,
//   Box,
//   Button,
//   Chip,
//   IconButton,
//   Snackbar,
//   TextField,
//   Typography,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useContext, useEffect, useState } from "react";
// import { Menu } from "../../typings/types";
// import { AppContext } from "../../contexts/AppContext";
// import Layout from "../../components/Layout";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import axios from "axios";

// const Login = () => {
//   const router = useRouter();

//   const { updateData, ...data } = useContext(AppContext);

//   const [user, setUser] = useState({ email: "", password: "" });

//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

//   const url = `${apiBaseUrl}/login`;

//   const signIn = async () => {
//     const isValid = user.email.length > 0 && user.password.length > 0;
//     if (!isValid) console.log("Something was wrong....");
//     try {
//       const res = await axios.post(url, { user });
//       const { accessToken } = res.data;

//       accessToken && localStorage.setItem("accessToken", accessToken);
//       if (accessToken) {
//         router.push("/");
//       }
//     } catch (err) {
//       console.log("Error here: ", err);
//     }
//   };

//   useEffect(() => {
//     router.prefetch("/");
//   }, [router]);

//   return (
//     <div className="w-full max-w-xl m-auto mt-36 bg-slate-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//       <form className="p-20">
//         <div className="mb-6">
//           <label
//             htmlFor="email"
//             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Your email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//             placeholder="John@gmail.com"
//             required
//             onChange={(evt) => setUser({ ...user, email: evt.target.value })}
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="password"
//             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Your password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//             placeholder="password"
//             required
//             onChange={(evt) => setUser({ ...user, password: evt.target.value })}
//           />
//         </div>
//         <div className="flex items-start mb-6">
//           <label
//             htmlFor="terms"
//             className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//           >
//             You dont have any account?{"   "}
//             <Link
//               href={"/register"}
//               className="text-blue-600 cursor-pointer dark:text-blue-500"
//             >
//               Create an account
//             </Link>
//           </label>
//         </div>
//         <div className="flex float-right">
//           <button
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             onClick={signIn}
//           >
//             Log In
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";
import { Box, Button, TextField } from "@mui/material";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default Login;
