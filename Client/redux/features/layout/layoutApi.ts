import {apiSlice} from"../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getHeroData:builder.query({
            query:(type) =>({
                url:`get-layout/${type}`,
                method:"GET",
                credentials:"include" as const,
            })
        }),
        editLayout:builder.mutation({
            query:({type,image,title,subTitle,faq,categories})=>({
                url:"edit-the-layout",
                body:{
                    type,
                    image,
                    title,
                    subTitle,
                    faq,
                    categories
                },
                method:"PUT",
                credntials:"include" as const
            })
        })
    })
});

export const {useGetHeroDataQuery, useEditLayoutMutation} = layoutApi;