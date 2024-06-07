"use client";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import DashboardHero from "@/app/components/admin/DashboardHero";
import AllInvoices from "@/app/components/admin/order/AllInvoices";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Headings";
import React from "react";


type Props = {}

const page = (props: Props) => {
  
  return (
    <div>
        <AdminProtected>
        <Heading
        title="ELearning-admin"
        description="Online platform to get help from teachers"
        keywords="program mern rjs"
        />
        <div className="flex h-screen">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar/>
            </div>
            <div className="w-[85%]">
                <DashboardHero/>
                <AllInvoices isDashboard={false}/>  
            </div>
        </div>
        </AdminProtected>
    </div>
  );
};

export default page;