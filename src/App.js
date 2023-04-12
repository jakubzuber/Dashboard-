import { HashRouter, Routes, Route, NavLink } from "react-router-dom"
import { Main } from './styled';
import Today from './Today';
import CalendarSite from './Calendar/Calendar'
import Planer from './Planner/'
// MUI
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

function App() {
  const { collapseSidebar } = useProSidebar();


  return (
    
      <HashRouter>
        <div id="app" style={({ height: "100vh" })}>
        <Sidebar style={{ height: "100vh" }} >
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
            >
              {""}
              <h2>Jakub</h2>
            </MenuItem>
            <NavLink to="/"><MenuItem icon={<HomeOutlinedIcon />}>Strona główna</MenuItem></NavLink>
            <NavLink to="/dzisiaj"><MenuItem icon={<WarehouseIcon />}>Rozładunki na dziś</MenuItem></NavLink>
            <NavLink to="/kalendarz"><MenuItem icon={<CalendarTodayOutlinedIcon />}>Kalendarz</MenuItem></NavLink>
            <NavLink to="/planer"><MenuItem icon={<AddToQueueIcon />}>Planer rozładunków</MenuItem></NavLink>
          </Menu>
        </Sidebar >
        </div >
          <Routes>
            <Route path="/kalendarz" element={<CalendarSite />}></Route>
            <Route path="/dzisiaj" element={<Today />}></Route>
            <Route path="/planer" element={<Planer />} />
            <Route path="/" element={<Today />}></Route>
          </Routes>
      </HashRouter>
   
  );
}

export default App;