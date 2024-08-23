import React from "react";
import Layout from "../components/Layout/Layout";
import WebsiteFlow from "../assets/Images/WebsiteFlow.png";
import HomePage1 from "../assets/Images/HomePage1.png";
import HomePage2 from "../assets/Images/HomePage2.png";

function HomePage() {
  return (
    <Layout>
      <div className="w-[90%] my-4 border-2 rounded-2xl hidden md:block">
        <img
          src={WebsiteFlow}
          alt=""
          srcset=""
          className=" h-[600px] w-full rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[97%] my-4 border-2 rounded-2xl block md:hidden">
          <img
            src={HomePage1}
            alt=""
            srcset=""
            className="object-cover w-full rounded-2xl"
          />
        </div>
        <div className="w-[97%] my-4 border-2 rounded-2xl block md:hidden">
          <img
            src={HomePage2}
            alt=""
            srcset=""
            className="object-cover w-full rounded-2xl"
          />
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
