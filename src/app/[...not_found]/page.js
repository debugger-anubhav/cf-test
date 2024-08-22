import React from "react";
import MainFile from "../../components/NotFound/MainFile";

export const generateStaticParams = async () => {
  return []; // No paths, will render 404 with a 200 status code
};

export default function NotFoundCatchAll({params}) {
  if (params?.not_found[0] === "404") {
    return <MainFile />;
  }
  return <MainFile />;
}
