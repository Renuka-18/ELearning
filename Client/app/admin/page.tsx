import React from "react";
import Heading from "../utils/Headings";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/admin/DashboardHero";

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
        <div className="flex h-[200vh]">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar/>
            </div>
            <div className="w-[85%]">
                <DashboardHero isDashboard={true}/>
                
            </div>
        </div>
        </AdminProtected>
    </div>
  );
};

export default page;