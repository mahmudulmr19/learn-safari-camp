import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Banner,
  Faq,
  Newsletter,
  PopularClasses,
  PopularInstructors,
} from "@/components/home";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Learn With Safari</title>
      </Helmet>
      <Banner />
      <PopularClasses />
      <PopularInstructors />
      <Faq />
      <Newsletter />
    </>
  );
};

export default Home;
