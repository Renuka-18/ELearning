import React, { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type HeroProps = {};

const Hero: FC<HeroProps> = () => {
  const { data,refetch} = useGetHeroDataQuery("Banner",{});
  return (
    <div className="relative w-full flex flex-col items-center justify-center 1000px:flex-row 1000px:justify-between 1000px:items-center py-10 1000px:py-20 min-h-screen">
      <div className="1000px:w-[40%] flex justify-center items-center relative z-10">
        <Image
          src={require("../../../public/assets/avatar1.png")}
          alt="Hero Image"
          className="object-contain 1100px:max-w-[90%] 1500px:max-w-[85%] h-auto"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center 1000px:items-start 1000px:text-left mt-[150px] 1000px:mt-0 w-full 1000px:w-[60%]">
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 1000px:text-[50px] font-bold font-Josefin py-2 1000px:leading-[75px]">
         {data?.layout?.banner?.title}
        </h2>
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-semibold text-[18px] mt-4 1000px:mt-6">
        {data?.layout?.banner?.subTitle}
        </p>
        <div className="w-full max-w-[500px] h-[50px] bg-transparent relative flex items-center mt-6">
          <input
            type="search"
            placeholder="Search Course..."
            className="flex-grow bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-l-[5px] p-2 outline-none text-[#000004e] text-[20px] font-medium font-Josefin"
          />
          <div className="flex items-center justify-center w-[50px] cursor-pointer h-[50px] bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] text-[18px] font-semibold mt-4">
          500k+ students trusted us.{" "}
          <Link href="/courses" className="dark:text-[#46e256] text-[crimson]">
            View Courses
          </Link>
        </p>
      </div>
    </div>
  );
};


export default Hero;
