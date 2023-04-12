import styled from "styled-components";

export const DndContexStyle = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    margin-top: 20px;
    margin: 0 auto;

    @media (max-width: 1400px) {
        font-size: 9px;
    }
`;

export const Container = styled.div`
     text-align: center;
`;

export const DroppableContainer = styled.div`
    padding: 20px;
    border: 3px solid #0057d9;
    min-width: 200px;
    margin: 1px;
    border-radius: 10px;
    align-items: center;
    min-height: 83vh;
    text-align: center;

    @media (max-width: 1400px) {
        padding: 15px;
    }
`;

export const RampTitle = styled.h2`
    font-size: 16px;
`;

export const Element = styled.div`
        width: 150px;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 5px;
        cursor: grab;
        box-sizing: border-box;
        font-size: 16px;
        border: 3px solid;
        border-color: ${props =>
            props.department === "TURCJA" ? "#d6dad6"
            : props.department === "TREX" ? "#a3e790"
            : props.department === "BLUE" ? "#59bce4"
            : props.department === "KRAJ" ? "#fdfdfd"
            : props.department === "XDOCK" ? "#f5c27c"
            : props.department === "PRL" ? "#dd7f7f" 
            : props.department === "JUKEJ" ? "#b671b6"
            : props.department === "COMBI" ? "#9d42d1"
            : "black"};
        background-color: ${props => 
            props.workingOn === 1 ? "#d65656" : "white"};

        @media (max-width: 1400px) {
            width: 160px;
            height: 30px;
            padding: 18px;
            font-size: 17px;
            font-weight: 700;
    }
`;