import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="h-[77.3vh] flex items-center justify-center flex-col">
        <h1 className=" text-4xl md:text-5xl font-bold justify-center flex text-primaryl  mb-8">
          404 Page Not Found
        </h1>
        <button
          className="bg-primaryl text-white px-4 py-2 rounded-md hover:bg-secondary "
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </Layout>
  );
}

export default PageNotFound;
