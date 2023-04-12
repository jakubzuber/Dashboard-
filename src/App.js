import { HashRouter, Routes, Route } from "react-router-dom"
import { DoubleLine, DoubleLinea, Main } from './styled';
import Today from './Today';
import Tomorrow from "./Tomorrow";
import CalendarSite from './Calendar/Calendar'
import Planer from './Planner/'
import { StyledNavLink, StyledNavListItem, StyledNavList } from "./styled";

function App() {
  return (
    <HashRouter>
      <Main>
        <nav>
          <StyledNavList>
            <StyledNavListItem>
              <StyledNavLink to="/dzisiaj">Dziś</StyledNavLink>
            </StyledNavListItem>
            <StyledNavListItem>
              <StyledNavLink to="/jutro">Jutro</StyledNavLink>
            </StyledNavListItem>
            <StyledNavListItem>
              <StyledNavLink to="/kalendarz">Kalendarz</StyledNavLink>
            </StyledNavListItem>
            <StyledNavListItem>
              <StyledNavLink to="/planer">Planer</StyledNavLink>
            </StyledNavListItem>
          </StyledNavList>
          <DoubleLine>.</DoubleLine>
          <DoubleLinea>.</DoubleLinea>
          <Routes>
            <Route path="/dzisiaj" element={<Today />}></Route>
            <Route path="/jutro" element={<Tomorrow />}></Route>
            <Route path="/kalendarz" element={<CalendarSite />}></Route>
            <Route path="/planer" element={<Planer />} />
            <Route path="/" element={<Today />}></Route>
          </Routes>
        </nav>
      </Main>
    </HashRouter>
  );
}

export default App;