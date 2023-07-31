import styled from "vue3-styled-components";
import { useMediaQuery } from "@vueuse/core";



export const Background = styled('div')`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    padding: 2rem;
    margin: auto;
    borderRadius: 1.5rem;
    background-color: ${props => props.theme.background};
    align-items: center;
`;

export const ColumnDiv = styled('div')`
    padding: 1.5rem;
    border-radius: 0.75rem;
    width: 40%;
    height: auto;
    align-items: center;
    text-align: center;
    color: ${props => props.theme.fontColor};
`;

export const CentralCard = styled('div')`
    padding: 1.5rem;
    background-color: ${props => props.theme.alt};
    border-radius: 0.75rem;
    width: clamp(100%, 100%, 50%);
    height: auto;
    border-radius: 10px;
    margin: 2% 1%;
    align-items: center;
    text-align: left;
    color: ${props => props.theme.fontColor};
`;