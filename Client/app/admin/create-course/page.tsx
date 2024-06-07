"use-client";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Heading from "@/app/utils/Headings";
import DashboardHeader from "../../components/admin/DashboardHeader";
import CreateCourse from "../../components/admin/Course/CreateCourse";

type Props={

}

const page =(props:Props) =>{
    return(
        <div>
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
                <DashboardHeader/>
                <CreateCourse/>
            </div>
        </div>   
    </div>   
    );
};

export default page;