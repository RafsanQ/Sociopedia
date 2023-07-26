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

