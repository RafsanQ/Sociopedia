import styled from "vue3-styled-components";
import { useMediaQuery } from "@vueuse/core";


export const WidgetWrapper = styled('div')`
    padding: 1.5rem;
    background-color: ${props => props.theme.alt};
    border-radius: 0.75rem;
    width: clamp(80%, 80%, 30%);
    height: auto;
    border-radius: 10px;
    margin: 2% auto;
    align-items: center;
    text-align: left;
    color: ${props => props.theme.fontColor};
`;


export const StyledInput = styled('input')`
    display: block;
    border: 1px dotted ${props => props.theme.fontColor};
    border-radius: 7px;
    padding: 1rem;
    margin: 2% auto;
    color: ${props => props.theme.fontColor};
    width: clamp(90%, 70%, 50%);
    &:focus {
        border: 1px solid ${props => props.theme.fontColor};
    }

    &::file-selector-button {
        color: black;
    }
`;
