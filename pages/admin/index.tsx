import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const AdminHome = () => {
  return <Layout />;
};

export default AdminHome;
