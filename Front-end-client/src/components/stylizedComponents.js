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
    padding: 1.5rem 1.5rem 0.75rem 1.5rem;
    border-radius: 0.75rem;
    width: clamp(60%, 50%, 30%);
    height: auto;
    margin: 2% auto;
    align-items: center;
    text-align: center;
    color: ${props => props.theme.fontColor};
`;
