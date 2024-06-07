import React, { useEffect } from "react";
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
    Tooltip,
    LineChart,
    CartesianAxis,
    CartesianGrid,
    Legend,
    Line
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { style } from "@/app/styles/style";


    // const analyticsData = [
    //     { name: "Page A", count: 4000 },
    //     { name: "Page B", count: 7000 },
    //     { name: "Page C", count: 9000 },
    //     { name: "Page D", count: 3000 },
    //     { name: "Page E", count: 2000 },
    //     { name: "Page F", count: 1000 },
    //     { name: "Page G", count: 6000 },
    //     { name: "Page H", count: 8000 },
    //     { name: "Page I", count: 1500 }

    // ];

    type Props = {
    isDashboard?: boolean;
    }

export default  function OrderAnalytics({ isDashboard }: Props)  {
    const {data,  isLoading } = useGetOrdersAnalyticsQuery({});
    useEffect(() =>{},[]);


    const analyticsData: any = [];

    data && data.orders.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count });
    });
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className={!isDashboard ? "h-[30vh]" : "h-screen"}>
                        <div className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}>
                            <h1 className={`${style.title} ${isDashboard && "!text-[20px"} px-5 !text-start`}>
                                Order Analytics
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
                            <ResponsiveContainer width={!isDashboard ? "100%" : "90%"} 
                            height={!isDashboard ? "50%" : "100%"}>
                                <LineChart
                                width={500}
                                height={300}
                                    data={analyticsData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    {!isDashboard && <Legend/>}
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#82ca9d"
                                         />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </>
    );
};

