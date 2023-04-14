import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: white;

    :hover {
        color: rgb(88, 74, 212);
    }
`;

export const SubTopic = styled.h2`
    margin-left: 1vw;
    font-size: 22px;
`;

export const SidebarButton = styled.p`
    margin-top: 3vh;

    :hover {
        color: rgb(88, 74, 212); 
    }
`;