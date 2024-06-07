"use-client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import CreateCourse from "@/app/components/admin/Course/CreateCourse";
import EditCourse from "@/app/components/admin/Course/EditCourse";
//import EditCourse from "@/app/components/admin/Course/EditCourse";
import DashboardHeader from "@/app/components/admin/DashboardHeader";
import Heading from "@/app/utils/Headings";


type Props={

}

const page =({params}:any) =>{
    const id=params?.id;

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
              <EditCourse id={id}/>
            </div>
        </div>   
    </div>   
    );
};

export default page;