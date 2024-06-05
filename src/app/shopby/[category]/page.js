"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const ShopByExtensionPage = ({params}) => {
  const router = useRouter();
  const pageName = params?.category;

  useEffect(() => {
    router.replace(`/bangalore/${pageName}`, undefined, {
      shallow: true,
      statusCode: 301,
    });
  }, []);

  return null;
};

export default ShopByExtensionPage;
