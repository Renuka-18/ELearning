import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi'
import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Headings';
import CourseContentMedia from './CourseContentMedia';
import Header from '../Header';

type Props = {
    id: string;
}

const CourseContent = ({ id }: Props) => {
    const { data: contentData, isLoading } = useGetCourseContentQuery(id);
    const data = contentData?.content;
    const [activeVideo, setActiveVideo] = useState(0);
    const[route,setRoute] = useState("Login")
    const [open, setOpen] = useState(false);

    return (
        <>
            {
                isLoading ? (
                    <Loader />

                ) : (
                    <>
                    <Header
                        activeItem={1}
                        open={open}
                        setOpen={setOpen}
                        route={route} 
                        setRoute={setRoute}
                        />
                        <div className="w-full grid 800px:grid-cols-10">
                            <Heading
                                title={data[activeVideo]?.title}
                                description="anything"
                                keywords={data[activeVideo]?.tags} />
                            <div className=" col-span-7">
                                <CourseContentMedia
                                    data={data}
                                    id={id}
                                    activeVideo={activeVideo}
                                    setActiveVideo={setActiveVideo} />

                            </div>
                        </div></>
                )
            }

        </>

    )
}

export default CourseContent;
