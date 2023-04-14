import { HashRouter, Routes, Route } from "react-router-dom"
import { StyledNavLink, SubTopic, SidebarButton } from "./styled";
// MUI
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import ArchiveIcon from '@mui/icons-material/Archive';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';


import Today from './Today';
import CalendarSite from './Calendar/Calendar'
import Planer from './Planner/'

function App() {
  const { collapseSidebar, collapsed } = useProSidebar(false);

  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <HashRouter>
        <Sidebar backgroundColor="#131f3d" style={({ height: "100vh" }, { color: "white" })}>
          <Menu>
              <MenuItem
                color="red"
                icon={<SidebarButton><MenuOutlinedIcon /></SidebarButton>}
                onClick={() => {
                  collapseSidebar();
                }}
                style={{ textAlign: "center", backgroundColor: 'transparent' }}
              >
                {""}
                <h2>Jakub</h2>
          </MenuItem>
          <StyledNavLink style={{ backgroundColor: 'transparent' }} to="/"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<HomeOutlinedIcon />}>Strona główna</MenuItem></StyledNavLink>
          <SubTopic>Spedycja</SubTopic>
          <StyledNavLink to="/sped-zlecenia"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<InventoryIcon />}>Zlecenia</MenuItem></StyledNavLink>
          <StyledNavLink to="/sped-planer"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<DashboardIcon />}>Planer</MenuItem></StyledNavLink>
          <StyledNavLink to="/sped-trasy"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<LocalShippingIcon />}>Trasy</MenuItem></StyledNavLink>
          <SubTopic collapsed={collapsed}>Magazyn</SubTopic>
          <StyledNavLink to="/mag-wydania"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<FlipToBackIcon />}>Zlecenia wydania</MenuItem></StyledNavLink>
          <StyledNavLink to="/mag-wydane"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<ArchiveIcon />}>Zlecenia wydane</MenuItem></StyledNavLink>
          <StyledNavLink to="/stany-magazynowe"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<WarehouseIcon />}>Stany magazynowe</MenuItem></StyledNavLink>
          <SubTopic>Księgowość</SubTopic>
          <StyledNavLink to="/faktury-do-wystawienia"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<InsertDriveFileIcon />}>Faktury do wystawienia</MenuItem></StyledNavLink>
          <StyledNavLink to="/faktury-wystawione"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<FolderCopyIcon />}>Faktury wystawione</MenuItem></StyledNavLink>
          <SubTopic>Dodatek</SubTopic>
          <StyledNavLink to="/dzisiaj"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<InventoryIcon />}>Rozładunki na dziś</MenuItem></StyledNavLink>
          <StyledNavLink to="/kalendarz"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<InventoryIcon />}>Kalendarz</MenuItem></StyledNavLink>
          <StyledNavLink to="/planer"><MenuItem style={{ backgroundColor: 'transparent' }} icon={<InventoryIcon />}>Planer rozładunków</MenuItem></StyledNavLink>
        </Menu>
      </Sidebar>
      <main>
        <Routes>
          <Route path="/kalendarz" element={<CalendarSite />}></Route>
          <Route path="/dzisiaj" element={<Today />}></Route>
          <Route path="/planer" element={<Planer />} />
          <Route path="/" element={<Today />}></Route>
        </Routes>
      </main>
    </HashRouter>
    </div >
  );
}

export default App;