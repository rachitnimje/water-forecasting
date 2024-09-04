// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection";
// import { ExplorePage } from "./components/Explore/ExplorePage";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="pt-16">
//         <Routes>
//           <Route path="/" element={<HeroSection />} />
//           <Route path="/explore" element={<ExplorePage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import { ExplorePage } from "./components/Explore/ExplorePage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;