"use client";
import React,{FC, useState} from "react";
import Heading from "./utils/Headings";
import Header from "./components/Header";
import Hero from"./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/Faq/FAQ";
import Footer from "./components/Footer";


interface Props{}



const Page: FC<Props> = (props) =>{
  const[open, setOpen] = useState(false);
  const[activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");

  return(
    <div>
      <Heading
      title="ELearning"
      description="Online platform to enhance coding ability"
      keywords="Programming,Full Stack,WebCourse,MERN"
      />
      <Header
      open = {open}
      setOpen={setOpen}
      activeItem = {activeItem}
      setRoute={setRoute}
      route={route}
      />
      <Hero/>
      <Courses/>
      <Reviews/>
      <FAQ/>
      <Footer/>
    </div>
  );
};

export default Page;