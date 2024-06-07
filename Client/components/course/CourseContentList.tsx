// import React, { FC, useState } from 'react'

// type Props = {
//     data:any;
//     activeVideo?:number;
//     setActiveVideo?:any;
// }

// const CourseContentList:FC<Props> = (props: Props) => {
//     const [visibleSections, setVisibleSections] = useState<Set<string>>(
//         new Set<string>()
//     );

//     const videoSections: string[]=[
//         ...new Set<string>(props.data?.map((item:any)=>item.videoSection))
//     ];

   
//     let totalCount: number = 0;

//     const toggleSection = (section:string) =>{
//         const newVisibleSection = new Set(visibleSections);
//         if(newVisibleSections.has(section)){
//             newVisibleSections.delete(section);
//         }else{
//             newVisibleSections.add(section);
//         }
//         setVisibleSections(newVisibleSections);
//     };

//   return (  
//     <div>CourseContentList</div>
//   )
// }

// export default CourseContentList