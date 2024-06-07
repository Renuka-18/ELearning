/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Headings";
import Header from "../components/Header";
import Protected from "../hooks/useProtected";
import Hero from "../components/Route/Hero";
import Profile from "./Profile";
import { useSelector } from "react-redux";

type Props = {};

const page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const {user}  = useSelector((state:any)=>state.auth);

    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name} profile` }
                    description="Online platform to enhance coding ability"
                    keywords="Programming,Full Stack,WebCourse,MERN"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <Profile user = {user}/>
            </Protected>
        </div>
    );
};

export default page;