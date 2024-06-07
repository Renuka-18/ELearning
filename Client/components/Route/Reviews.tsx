import React from 'react';
import Image from 'next/image';
import { style } from '@/app/styles/style';
import ReviewCard from './ReviewCard';

type Props = {}


export const reviews = [
    {
        name: "Priya",
        avatar: "https://randomuser.me/api/portraits/women/50.jpg",
        profession: "Student",
        comment: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
        

    },
    {
        name: "Lara",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        profession: "Student",
        comment: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
        

    },
    {
        name: "Jai",
        avatar: "https://randomuser.me/api/portraits/men/63.jpg",
        profession: "Student",
        comment: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
        

    },
    {
        name: "Asha",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        profession: "Student",
        comment: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
        

    },
    {
        name: "Christ",
        avatar: "https://randomuser.me/api/portraits/men/80.jpg",
        profession: "Student",
        comment: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
        

    },
    {
        name: "Joe",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        profession: "Student",
        comment: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
        

    },
]
const Reviews = (props: Props) => {
    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="1000px:w-[40%] flex justify-center items-center relative z-10">
                    <Image
                    src={require("../../../public/assets/buzz.png")}
                    alt=""
                    className="object-contain 1100px:max-w-[90%] 1500px:max-w-[85%] h-auto"
                    width={700}
                    height={700}/>
                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${style.title} 800px:!text-[40px]`}>
                        Our students are <span className="text-gradient">Our Strength</span>{" "}
                        <br/>See what they say about us
                    </h3>
                    <br/>
                    <p className={style.label}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, est, odit quod quam neque quibusdam veniam repudiandae maiores non laborum quasi tenetur officiis corrupti, vel unde ab reiciendis sed error.
                    </p>
                </div>
                <br/>
                <br/>
            </div>
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-40px]">
                    {
                        reviews &&
                        reviews.map((i,index)=><ReviewCard item={i} key={index}/>) }
                </div>
               
        </div>
    )
}

export default Reviews