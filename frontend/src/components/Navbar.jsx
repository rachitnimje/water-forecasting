// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();''

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogoClick = () => {
//     navigate("/");
//   }

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-3 z-50 px-6">
//       <div className="mx-auto">
//         <div className="flex justify-between items-center">
//           <div className="text-[1.8rem] font-bold cursor-pointer" onClick={handleLogoClick}> <h1>Jal Sankalp</h1></div>

//           <div className="md:hidden">
//             <button onClick={toggleMenu} className="focus:outline-none">
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           <ul className="hidden md:flex space-x-4">
//             <NavItem href="#" text="Historic Water Usage" />
//             <NavItem href="#" text="Climate Projections" />
//             <NavItem href="#" text="Population Growth Trends" />
//             <NavItem href="#" text="Team" isLast={true} />
//           </ul>
//         </div>

//         {isMenuOpen && (
//           <div className="md:hidden mt-4">
//             <ul className="flex flex-col space-y-2">
//               <NavItem href="#" text="Historic Water Usage" isMobile={true} />
//               <NavItem href="#" text="Climate Projections" isMobile={true} />
//               <NavItem href="#" text="Population Growth Trends" isMobile={true} />
//               <NavItem href="#" text="Team" isMobile={true} isLast={true} />
//             </ul>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// const NavItem = ({ href, text, isMobile = false, isLast = false }) => (
//   <li>
//     <a
//       href={href}
//       className={`hover:text-blue-200 transition-colors duration-200 text-lg
//         ${!isMobile && !isLast ? 'border-r-2 pr-2 border-blue-200' : ''}
//         ${isMobile ? 'block py-2' : ''}`}
//     >
//       {text}
//     </a>
//   </li>
// );

// export default Navbar;

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
  }

  return (
    <nav className="bg-gray-900 text-white p-4 z-50">
      <div className="px-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold cursor-pointer" onClick={handleLogoClick}>
            <h1>Jal Sankalp</h1>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <ul className="hidden md:flex space-x-4">
            <NavItem href="#" text="Explore" />
            <NavItem href="#" text="Predict" />
            <NavItem href="#" text="Water Quality" />
            <NavItem href="#" text="Team" isLast={true} />
          </ul>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              <NavItem href="#" text="Explore" isMobile={true} />
              <NavItem href="#" text="Predict" isMobile={true} />
              <NavItem href="#" text="Water Quality" isMobile={true} />
              <NavItem href="#" text="Team" isMobile={true} isLast={true} />
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavItem = ({ href, text, isMobile = false, isLast = false }) => (
  <li>
    <a
      href={href}
      className={`hover:text-blue-200 transition-colors duration-200 
      ${!isMobile && !isLast ? 'border-r pr-2 border-blue-200' : ''}
      ${isMobile ? 'block py-2' : ''}`}
    >
      {text}
    </a>
  </li>
);

export default Navbar;