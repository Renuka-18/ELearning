import React from "react";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    LabelList,
    Label,
    AreaChart,
    Area,
    Tooltip
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { style } from "@/app/styles/style";

type Props = {
    isDashboard?: boolean;
}

const UserAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});

    // const analyticsData = [
    //     { name: "Jan 2023", count: 440 },
    //     { name: "Feb 2023", count: 8200 },
    //     { name: "Mar 2023", count: 1300 },
    //     { name: "Apr 2023", count: 490 },
    //     { name: "May 2023", count: 943 },
    //     { name: "Jun 2023", count: 768 },
    //     { name: "Jul 2023", count: 180 },
    //     { name: "Aug 2023", count: 400 },
    //     { name: "Sep 2023", count: 340 },
    //     { name: "Oct 2023", count: 222 },
    //     { name: "Nov 2023", count: 110 },
    //     { name: "Dec 2023", count: 3333 },
    // ];

    const analyticsData: any = [];

    data && data.users.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count });
    });
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
                        <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
                            <h1 className={`${style.title} ${isDashboard && "!text-[20px"} px-5 !text-start`}>
                                Users Analytics
                            </h1>
                            {
                                !isDashboard && (
                                    <p className={`${style.label} px-5`}>
                                        Last 12 months analytics Data {" "}
                                    </p>
                                )
                            }
                        </div>
                        <div className={`w-full ${isDashboard ? "j-[30vh]" : "h-screen"} flex items-center justify-center`}>
                            <ResponsiveContainer width={!isDashboard ? "100%" : "90%"} height={!isDashboard ? "50%" : "100%"}>
                                <AreaChart
                                    data={analyticsData}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        left: 0,
                                        bottom: 0
                                    }}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#4d62d9"
                                        fill="#4d62d9" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default UserAnalytics;