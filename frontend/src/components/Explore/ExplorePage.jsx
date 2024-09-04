// import React from "react";

// export function ExplorePage() {
//   return (
//     <div className="flex bg-gray-900 h-screen">
//       {/* Left side - Map */}
//       <div className="w-1/3 flex flex-col h-full">
//         <h1 className="text-white p-4 bg-gray-800 text-center">India Map</h1>
//         <div className="flex-grow overflow-y-auto bg-white">
//           {/* Map component will be inserted here */}
//           <div className="h-[200vh] bg-gray-200 p-4">
//             {/* Placeholder for the map */}
//             <p className="text-center pt-40">Map will be rendered here</p>
//             <p className="text-center pt-40">Scroll down for more map content</p>
//           </div>
//         </div>
//       </div>

//       {/* Right side - Charts */}
//       <div className="w-2/3 flex flex-col h-full">
//         <div className="flex-grow overflow-y-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//             {/* Placeholder charts */}
//             {[1, 2, 3, 4, 5, 6].map((item) => (
//               <div key={item} className="bg-white rounded-lg shadow-md p-4">
//                 <h2 className="text-lg font-semibold mb-2">Chart {item}</h2>
//                 <div className="h-64 bg-gray-200">
//                   <p className="text-center pt-28">Chart content</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import RedhillsChart from "./Charts/RedhillsChart";

// export function ExplorePage() {
//   return (
//     <div className="flex bg-gray-900 h-screen">
//       {/* Left side - Map */}
//       <div className="w-1/3 h-screen flex flex-col overflow-hidden">
//         <h1 className="text-white p-4 bg-gray-800 text-center">India Map</h1>
//         <div className="flex-grow overflow-y-auto">
//           {/* Map component will be inserted here */}
          
//         </div>
//       </div>

//       {/* Right side - Charts */}
//       <div className="w-2/3 h-screen flex flex-col overflow-hidden">
//         <div className="flex-grow overflow-y-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//             {/* Placeholder charts */}
//             {/* {[...Array(12)].map((_, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md p-4">
//                 <h2 className="text-lg font-semibold mb-2">Chart {index + 1}</h2>
//                 <div className="h-64 bg-gray-200">
//                   <p className="text-center pt-28">Chart content</p>
//                 </div>
//               </div>
//             ))} */}

//             <div>
//               <RedhillsChart />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { ChennaiReservoirGraph, ChennaiRainfallGraph, ChennaiPopulationBarChart, ChennaiPopulationGrowthChart, ChennaiGroundWaterLevelBoxPlot} from "./Charts/ChennaiGraph";
import MapComponent from "./IndiaMap";

export function ExplorePage() {
  return (
    <div className="flex bg-gray-900 h-screen">
      {/* Left side - Map */}
      <div className="w-1/3 h-screen flex flex-col overflow-hidden rounded-lg ml-5">
        <h1 className="text-white p-3 bg-gray-800 text-center text-xl">India Map</h1>
        <div className="flex-grow overflow-y-auto">
          <MapComponent />
        </div>
      </div>
      
      {/* Right side - Charts */}
      <div className="w-2/3 h-screen flex flex-col overflow-hidden">
        <div className="flex-grow overflow-y-auto">
          <div className="">
            <ChennaiReservoirGraph />
            <ChennaiRainfallGraph />
            <ChennaiPopulationGrowthChart />
            <ChennaiPopulationBarChart />
            <ChennaiGroundWaterLevelBoxPlot />
          </div>
        </div>
      </div>
    </div>
  );
}