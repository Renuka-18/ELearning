import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useState, useEffect } from "react";
import Loader from "../../Loader/Loader";
import { style } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { VscRepoFetch } from "react-icons/vsc";

type Props = {}

const EditCategories = (props: Props) => {
    const { data, isLoading,refetch } = useGetHeroDataQuery("Categories", { refetchOnMountOrArgChange: true });
    const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
    const [categories, setCategories] = useState<any>([]);
    
    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories);
        }
        if(layoutSuccess){
           refetch();
            toast.success("Categories updated successfully");
        }
        if(error){
            if("data" in error){
                const errorData = error as any;
                toast.error(errorData?.data?.message);
            }
        }
    }, [data, error, layoutSuccess, refetch]);
    
    const handleCategoriesAdd = async (id: string, value: string) => {
       setCategories((prevCategory:any)=>
        prevCategory.map((i:any) => (i._id === id ?{...i, title:value} :i))
    );
    };
    
    const handleCategoryDelete = (id: string) => {
        const updatedCategories = categories.filter((category: any) => category._id !== id);
        setCategories(updatedCategories);
    };
    const newCategoriesHandler = () =>{
        if(categories[categories.length-1].title === ""){
            toast.error("Category cant be empty");
        }else{
            setCategories((prevCategory:any) => [...prevCategory,{title:""}]);
        }
    };


    const areCategoriesUnChanged=(
        originalCategories:any[],
        newCategories:any[]
    ) =>{
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    };

    const isAnyCategoryTitleEmpty = (categories:any[] )=>{
        return categories.some((q) => q.title === "");
    };

    const editCatgeoriesHandler = async() =>{
        if(!areCategoriesUnChanged(data.layout.categories, categories) && !isAnyCategoryTitleEmpty(categories)){
            await editLayout({
                type:"Categories",
                categories,
            });
        };
    };
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="mt-[120px] text-center">
                    <h1 className={`${style.title}`}>All Categories</h1>
                    {categories && categories.map((item: any, index: number) => (
                        <div className="p-3" key={index}>
                            <div className="flex items-center w-full justify-center">
                                <input
                                    className={`${style.input} !w-[unset] !border-none !text-[20px]`}
                                    value={item.title}
                                    onChange={(e) =>
                                        handleCategoriesAdd(item._id, e.target.value)
                                    }
                                    placeholder="add category title"
                                />
                                <AiOutlineDelete
                                    className="dark:text-white text-black text-[18px] cursor-pointer"
                                    onClick={() => handleCategoryDelete(item._id)}
                                />
                            </div>
                        </div>
                    ))}
                    <br/>
                    <br/>
                    <br/>
                    <div className="w-full flex justify-center">
                        <IoMdAddCircleOutline
                        className="dark:text-white text-black text-[25px] cursor-pointer"
                        onClick={newCategoriesHandler}/>
                    </div>
                    <div className={`${style.button} !w-[100px] !min-h-[40px] ![h-40px] dark:text-white text-black bg-[#cccccc34]
        ${areCategoriesUnChanged(data.layout.categories, categories) ||
                                isAnyCategoryTitleEmpty(categories) ? "!cursor-not-allowed" : "!cursor-pointer !bg-[#42d383]"
                            }
        !rounded absolute bottom-12 right-12`}
                            onClick={
                                areCategoriesUnChanged(data.layout.categories, categories) ||
                                isAnyCategoryTitleEmpty(categories) ? () => null : editCatgeoriesHandler
                            }>
                            Save
                        </div>
                </div>
            )}
        </>
    );
};

export default EditCategories;
