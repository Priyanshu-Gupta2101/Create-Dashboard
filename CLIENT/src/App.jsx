import TopBar from "./scenes/global/TopBar";
import DashBoard from "./scenes/dashboard";
import SideBarComponent from "./scenes/global/SideBarComponent";
import Filter from "./scenes/filter";
import Insights from "./scenes/insights";
import DetailedData from "./scenes/detailed";
import SingleDetailedData from "./scenes/detailed/data";
import About from "./scenes/about";
import Contact from "./scenes/contact";
import ErrorPage from "./scenes/error";
import Faq from "./scenes/FAQ";
import Swot from "./components/SWOT";
import Region from "./components/Region";
import Topic from "./components/Topic";
import Source from "./components/Source";
import Sector from "./components/Sector";
import EndYear from "./components/EndYear";

import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="app"
          style={{ display: "flex", height: "100vh", overflow: "hidden" }}
        >
          <SideBarComponent />
          <main
            className="content"
            style={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <TopBar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/detailed" element={<DetailedData />} />
              <Route path="/detailed/:id" element={<SingleDetailedData />} />
              <Route path="/filters" element={<Filter />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/swot" element={<Swot />} />
              <Route path="/region" element={<Region />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/source" element={<Source />} />
              <Route path="/sector" element={<Sector />} />
              <Route path="/end_year" element={<EndYear />} />
              <Route path="/faq" element={<Faq />} />
              <Route
                path="*"
                element={
                  <ErrorPage
                    data={{
                      header: "404",
                      message: "Page not found.",
                      links: [{ text: "Dashboard", link_path: "/" }],
                    }}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
