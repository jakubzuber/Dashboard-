import styled from "styled-components";

export const Topic = styled.div`
    text-align: center;
    font-size: 19px;
    margin: 30px 0px 20px 0px;
    background-color: #0057d9;
    color: white;
    padding: 5px;
    
    @media (max-width: 768px) {
        min-width: 1200px;
    }
`;

export const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        min-width: 1200px;
    }
`;

export const Thead = styled.thead`
    position: sticky;
    top: 0;
    background-color: #f6f9fc;
    color: #8493a5;
`;

export const Th = styled.th`
    position: sticky;
    top: 0;
    background-color: #f6f9fc;
    color: #8493a5;
    border-bottom: 1px solid #dddddd;
    text-align: center;
    height: 60px;
    font-size: 12px;

    @media (max-width: 1400px) {
        font-size: 9px;
    }

    @media (height: 1080px) {
        font-size: 14px;
        font-weight: 500;
    }
`;

export const Td = styled.td`
    border-bottom: 1px solid #dddddd;
    padding: 4px 0px;
    text-align: center;
    font-size: 12px;

    @media (max-width: 1400px) {
        font-size: 9px;
    }
`;

export const TrWorkingOnDomestic = styled.tr`
    background-color: #ffffff;
    border: 2px solid red;
`;

export const TrWorkingON = styled.tr`
    background-color: #f1efef;
    border: 2px solid red;

    :hover {
        background-color: #c8cfda;
        cursor: pointer;
    }
`;

export const Tr = styled.tr`

    :hover {
    color: #0057d9;
    cursor: pointer;
    background-color: #f6f9fc;
    }
`;

export const TrDetails = styled.tr`
    background-color: #eaecee;
`;

export const Ul = styled.ul`
    margin: 0;
    padding: 0;
`;

export const Li = styled.li`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const P = styled.p`
    text-align: center;
    font-size: 25px;
    background-color: #0057d9;
    color: white;
    padding: 20px;
`;

export const TableForDetails = styled.table`
    border: 2px solid #0057d9;   
    border-collapse: collapse;    
    position: sticky;
    margin: 3px;
    width: 49vw;
`;