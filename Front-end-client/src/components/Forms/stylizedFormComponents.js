import styled from "vue3-styled-components";


export const CenteredForm = styled('form')`
    width: clamp(70%, 70%, 40%);
    background-color: ${props => props.theme.alt}
    padding: 50px;
    border-radius: 10px;
    margin: 2% auto;
    align-items: center;
    text-align: center;
    justify-content: center;
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

export const StyledSmallInput= styled('input')`
    display: inline;
    border: 1px dotted ${props => props.theme.fontColor};
    border-radius: 7px;
    padding: 1rem;
    margin: 1% 1.5%;
    color: ${props => props.theme.fontColor};
    width: clamp(43.5%, 40%, 20%);
    &:focus {
        border: 1px solid ${props => props.theme.fontColor};
    }
`;


export const StyledSubmitButton = styled('button')`
    display: block;
    border-radius: 7px;
    width: clamp(90%, 70%, 50%);
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

export const StyledText = styled('p')`
    display: inline;
    padding: 0 1em;
`;

export const StyledTextButton = styled('p')`
    display: inline;
    padding: 1em;
    cursor: pointer;

    &:hover {
        filter: brightness(130%);
        text-decoration: underline;
    }
`;

