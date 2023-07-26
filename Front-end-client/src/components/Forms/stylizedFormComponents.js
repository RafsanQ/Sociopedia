import styled from "vue3-styled-components";
import { useMediaQuery } from "@vueuse/core";


const isLargeScreen = useMediaQuery('(min-width: 800px)')


export const CenteredForm = styled('form')`
    width: 40%;
    background-color: ${props => props.theme.alt}
    padding: 50px;
    border-radius: 10px;
    margin: auto;
    align-items: center;
    color: ${props => props.theme.fontColor};
`;

export const StyledInput = styled('input')`
    display: block;
    border: 1px dotted ${props => props.theme.fontColor};
    border-radius: 7px;
    padding: 0.5rem;
    margin: 2rem auto;
    color: ${props => props.theme.fontColor};
    width: clamp(80%, 70%, 50%);
    &:focus {
        border: 1px solid ${props => props.theme.fontColor};
    }
`;

export const StyledSubmitButton = styled('button')`
    display: block;
    border-radius: 7px;
    width: clamp(80%, 70%, 50%);
    padding: 0.5em 1em;
    background-color: ${props => props.theme.primary};
    color: black;
    margin: 2rem auto;
    box-shadow: 0 0 4px #999;

    background-position: center;
    transition: background 0.8s;

    &:hover {
        filter: brightness(90%);
    }

    &:active {
        filter: brightness(100%);
    }
`;