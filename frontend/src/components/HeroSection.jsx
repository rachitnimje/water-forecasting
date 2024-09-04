import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedNumbers from "react-animated-numbers";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explore");
  };

  const counterData = [
    { number: 350000, label: "Reservoirs" },
    { number: 1400000, label: "Ponds" },
    { number: 200000, label: "Dams" },
    { number: 30000, label: "Lakes" },
  ];

  return (
    <div className="relative bg-blue-950 text-blue-900 min-h-screen flex flex-col justify-center items-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/water-bg.gif")' }}
      />
      <div className="container mx-auto relative z-10">
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {counterData.map((item, index) => (
            <div
              key={index}
              className="text-center bg-white bg-opacity-80 p-4 rounded-lg"
            >
              <div className="flex justify-center items-center">
                <AnimatedNumbers
                  includeComma
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.5,
                  })}
                  animateToNumber={item.number}
                  fontStyle={{
                    fontSize: 40,
                    fontWeight: "bold",
                  }}
                />
                <span className="text-4xl font-bold ml-1">+</span>
              </div>
              <p className="text-xl mt-2">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center text-center mb-8">
          <p className="text-2xl text-white font-bold">
            Forecast India's Water Resources
          </p>
          <p className="text-xl text-white w-full md:w-2/4 mt-4">
            Explore our comprehensive solution to forecast and optimize India's
            water resources now!
          </p>
        </div>
        <div className="text-center">
          <button
            className="bg-white hover:bg-blue-100 hover:scale-125 text-black font-bold py-2 px-4 rounded transition duration-300"
            onClick={handleExploreClick}
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import AnimatedNumbers from "react-animated-numbers";

// const HeroSection = () => {
//   const navigate = useNavigate();

//   const handleExploreClick = () => {
//     navigate("/explore");
//   };

//   const counterData = [
//     { number: 350000, label: "Reservoirs" },
//     { number: 1400000, label: "Ponds" },
//     { number: 200000, label: "Dams" },
//     { number: 30000, label: "Lakes" },
//   ];

//   return (
//     <div className="relative bg-blue-950 text-blue-900 h-screen flex flex-col justify-center items-center p-4 overflow-hidden mt-16">
//       {" "}
//       <div
//         className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: 'url("/water-bg.gif")' }}
//       />
//       <div className="container mx-auto relative z-10">
//         <div className="flex flex-wrap justify-center gap-8 mb-12">
//           {counterData.map((item, index) => (
//             <div
//               key={index}
//               className="text-center bg-white bg-opacity-80 p-4 rounded-lg"
//             >
//               <div className="flex justify-center items-center">
//                 <AnimatedNumbers
//                   includeComma
//                   transitions={(index) => ({
//                     type: "spring",
//                     duration: index + 0.5,
//                   })}
//                   animateToNumber={item.number}
//                   fontStyle={{
//                     fontSize: 40,
//                     fontWeight: "bold",
//                   }}
//                 />
//                 <span className="text-4xl font-bold ml-1">+</span>
//               </div>
//               <p className="text-xl mt-2">{item.label}</p>
//             </div>
//           ))}
//         </div>
//         <div className="flex flex-col justify-center items-center text-center mb-8">
//           <p className="text-2xl text-white font-bold">
//             Forecast India's Water Resources
//           </p>
//           <p className="text-xl text-white w-2/4">
//             Explore our comprehensive solution to forecast and optimize India's
//             water resources now!
//           </p>
//         </div>
//         <div className="text-center">
//           <button
//             className="bg-white hover:scale-125 text-black font-bold py-2 px-4 rounded transition duration-300"
//             onClick={handleExploreClick}
//           >
//             Explore Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
