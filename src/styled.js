import styled from "styled-components";

export const Main = styled.form`
    margin: 0 auto;
    padding: 0;
    margin-bottom: 10px;
    
    @media (height: 1080px) {
        font-size: 20px;
        font-weight: 400;
        margin-right: 1px;
        margin-left: 1px;
    }
  `;
  

export const MainContent = styled.div`
    margin-bottom: 10px;
    margin-left: 0;
    //position: relative;
    max-width: 1000px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-row: auto auto;
    grid-column-gap: 4px;
    grid-row-gap: 5px;
    
    @media (max-width: 868px){
        margin-top: 70px;
        margin-bottom: 20px;
        transform: none;
        grid-template-columns: 1fr;
    }
`;

export const DoubleLine = styled.p`
    background-color: #0057d9;
    color: #0057d9;
    font-size: 6px;
    
    @media (max-width: 868px) {
        min-width: 1200px;
    }

    @media (height: 1080px) {
        display: none;
        
    }
`;

export const DoubleLinea = styled.p`
    background-color: #0057d9;
    color: #0057d9;
    font-size: 4px;
    @media (max-width: 768px) {
        min-width: 1200px;
    }
    @media (height: 1080px) {
        display: none;
    }
`;