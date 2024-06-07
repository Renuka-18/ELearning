import React, { FC, useEffect, useState } from "react";
import { style } from "@/app/styles/style";
import EditCategories from "../customization/Editcategories";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);
    const { data } = useGetHeroDataQuery("Categories", {});
    const[categories, setCategories] = useState([]);
    useEffect(()=>{
        if(data){
            setCategories(data.layout.categories);
        }
    },[data]);


    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }

    };
    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseInfo({ ...CourseInformation, thumbnail: reader.result });
            };
            reader.readAsDataURL(file);
        }

    };
    return (
        <><div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit} className={`${style.label}`}>
                <div>
                    <label htmlFor="">
                        Course Name
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={courseInfo.name}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        id="name"
                        placeholder="Mern Stack with LMS"
                        className={`${style.input}`} />
                </div>
                <br />
                <div className="mb-5">
                    <label className={`${style.label}`}>Course Description</label>
                    <textarea name="" id="" cols={30} rows={8}
                        placeholder="Write something...."
                        className={`${style.input} !h-min !py-2`}
                        value={courseInfo.description}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, description: e.target.value })
                        }>

                    </textarea>
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${style.label}`}>Course Price</label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.price}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, price: e.target.value })
                            }
                            id="price"
                            placeholder="29"
                            className={`${style.input}`} />
                    </div>
                    <div className="w-[50%]">
                        <label className={`${style.label}`}>Estimated Course Price</label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                            }
                            id="price"
                            placeholder="79"
                            className={`${style.input}`} />
                    </div>
                </div>
                <br />
                <div>
                    <label className={`${style.label}`} htmlFor="email">
                        Course Tags
                    </label>
                    <input
                        type="text"
                        name=""
                        required
                        value={courseInfo.tags}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, tags: e.target.value })
                        }
                        id="tags"
                        placeholder="MERN, Next.."
                        className={`${style.input}`} />

                </div>
                <br/>
                <div className="w-[50%]">
                    <label className={`${style.label} w-[50%]`} >
                        Course Categories
                    </label>
                    <br/>
                    <select name="" id="" className={`${style.input}`}
                    value={courseInfo.category}
                    onChange={(e:any) =>
                        setCourseInfo({...courseInfo, category:e.target.value})
                    }>
                        <option value="">Select category</option>
                        {
                            categories.map((item:any) =>(
                                <option value={item.title} key={item._id}>
                                    {item.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <br />
                <div className="w-full justify-between flex">
                    <div className="w-[45%]">
                        <label className={`${style.label}`}>Course Level</label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.level}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, level: e.target.value })
                            }
                            id="level"
                            placeholder="Beginner/Intermediate/Pro"
                            className={`${style.input}`} />
                    </div>
                    <div className="w-[45%]">
                        <label className={`${style.label} w-[50%]`}>Demo Url</label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                            }
                            id="demoUrl"
                            placeholder="hjklmnop"
                            className={`${style.input}`} />
                    </div>
                </div>
                <br />
                <div className="w-[45%]">
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden width: 100%;
                        padding: 0.5rem;
                        border: 1px solid #ccc;
                        border-radius: 4px;"
                        
                        onChange={handleFileChange} />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 flex items-center justify-center${dragging ? "bg-blue-500" : "bg-transparent"
                            }display: block;
                            margin-bottom: 0.5rem;
                            font-weight: bold;`
                        }
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}>
                        {
                        courseInfo.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={courseInfo.thumbnail}
                                alt=""
                                className="max-h-full w-full object-cover" />

                        ) : (
                            <span className="text-black dark:text-white">
                                Drag or click to browse
                            </span>
                        )}
                    </label>
                </div>
                <br/>
                <div className="w-full flex items-center justify-end">
                    <input
                    type="submit"
                    value="Next"
                    className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"/>
                </div>
                <br/>
                <br/>
            </form>
        </div></>
    );
};

export default CourseInformation;