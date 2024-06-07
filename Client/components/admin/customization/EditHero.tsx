import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatar1 from "../../../../public/assets/avatar1.png";
import Image from "next/image";
import { style } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {}

const EditHero: FC<Props> = (props: Props) => {

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [image, setImage] = useState("");
    const { data,refetch } = useGetHeroDataQuery("Banner", {refetchOnMountOrArgChange:true });
    const  [editLayout, {isLoading, isSuccess,error}] = useEditLayoutMutation();

    useEffect(() => {
        if (data) {
            setTitle(data?.layout?.banner?.title  );
            setSubTitle(data?.layout?.banner?.subTitle);
            setImage(data?.layout?.banner?.image?.url);
        }
        if(isSuccess){
            refetch();
            toast.success("Hero updated Successfully");
        }
        if(error){
            if("data" in error){
                const errorData = error as any;
                toast.error(errorData?.data?.message);
            }
        }
    }, [data, isSuccess, error, refetch]);

    const handleUpdate = (e: any) => {
        const file = e.target.files?.[0];
        if(file){
            const reader = new FileReader();
            reader.onload = (e:any) =>{
                if(reader.readyState === 2){
                    setImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async () => {
        await editLayout({
            type:"Banner",
            image,
            title,
            subTitle,
        });
    };

    return (
        <>
            <div className="w-full flex items-center justify-between min-h-screen p-4">
                <div className="relative flex items-start justify-start h-[50vh] w-[50vh] hero_animation rounded-full overflow-hidden">
                    <Image
                        src={avatar1}
                        alt="Banner Image"
                        layout="fill"
                        objectFit=""
                        className="rounded-full"
                    />
                    <input
                        type="file"
                        id="banner"
                        accept="image/*"
                        onChange={handleUpdate}
                        className="hidden"
                    />
                    <label htmlFor="banner" className="absolute bottom-0 right-0">
                        <AiOutlineCamera className="text-black dark:text-white text-[18px] cursor-pointer" />
                    </label>
                </div>
                <div className="flex flex-col items-center mx-auto mt-[150px] text-center">
                    <textarea
                        className="dark:text-white resize-none text-[#000000c7] text-[30px] px-2 1000px:text-[50px] font-bold font-Josefin py-2 1000px:leading-[75px]"
                        placeholder="Improve Your Online Learning Experience In Better Quality"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        rows={4}
                    />
                    <br />
                    <input
                        type="text"
                        className="dark:text-white resize-none text-[#000000c7] text-[20px] px-2 1000px:text-[30px]  font-Poppins py-2 1000px:leading-[35px] w-full"
                        placeholder="We have 40k+ Online Courses & 500k+ Online registered Students. Find your desired course among over there."
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div 
                        className={`${style.button} !w-[80px] !h-[30px] !text-sm bg-[#57c7a3] ${
                            data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.subTitle !== subTitle ||
                            data?.layout?.banner?.image !== image
                            ? "!cursor-pointer !bg-[#42d383]"
                            : "!cursor-not-allowed"
                        } !rounded absolute bottom-12 right-12`}
                        onClick={
                            data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.subTitle !== subTitle ||
                            data?.layout?.banner?.image !== image
                            ? handleEdit : () => null
                        }>
                        Save
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditHero;
