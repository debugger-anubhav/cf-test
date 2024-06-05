"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const UserSignUpExtensionPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login", undefined, {shallow: true, statusCode: 301});
  }, []);

  return null;
};

export default UserSignUpExtensionPage;
