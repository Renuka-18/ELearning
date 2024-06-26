import { style } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import React, { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

type Props = {
    data:any;
    id:string;
    activeVideo:number;
    setActiveVideo:(activeVideo:number)=>void;
}

const CourseContentMedia = ({data,id,activeVideo,setActiveVideo}: Props) => {
    const[activeBar,setactiveBar] = useState(0);
  return (
    <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
        <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}/>
        <div className="w-full flex items-center justify-between my-3">
            <div className={`${style.button} dark:text-white text-black !min-h-[40px] !py-[unset] ${
                activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
            }`}
            onClick={()=>{
                setActiveVideo(activeVideo === 0? 0:activeVideo -1)
            }}>
                <AiOutlineArrowLeft className="mr-2"/>
                Prev Lesson
            </div>
            <div className={`${style.button}  dark:text-white text-black !w-[unset] !min-h-[40px] !py-[unset] ${
                data.length -1 === activeVideo && "!cursor-no-drop opacity-[.8]"
            }`}
            onClick={()=>
                setActiveVideo(
                    data && data.length -1 === activeVideo ? activeVideo :activeVideo +1
                )
            }>
                Next Lesson
                <AiOutlineArrowRight className='ml-2'/>
            </div>
        </div>
        <h1 className='pt-2 text-[25px] font-[600]'>{data[activeVideo].title}</h1>
        <br/>
        <div className='w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
            {["Overview","Resources", "Q&A","Reviews"].map((text, index)=>(
                <h5
                key={index}
                className={` dark:text-white text-black 800px:text-[20px] cursor-pointer${
                    activeBar === index && "text-red-500"
                }`}
                onClick={()=>setactiveBar(index)}>
                    {text}
                </h5>
            ))}
        </div>
        <br/>
        {activeBar === 0 && (
            <p className='text-[18px]   dark:text-white text-black whitespace-pre-line mb-3'>
                {data[activeVideo]?.description}
            </p>
        )}
        {
            activeBar === 1 &&(
                <div>
                    {data[activeVideo]?.links.map((item:any,index:number)=>(
                        <div className='mb-5'>
                            <h2 className="800px:text-[20px] 800px:inline-block">
                                {item.title && item.title + " : "}
                            </h2>
                            <a className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                            href={item.url}>{item.url}</a>
                            </div>
                    ))}
                    </div>
            )
        }
    </div>
  )
}

export default CourseContentMedia