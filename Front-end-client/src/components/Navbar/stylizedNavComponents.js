import styled from "vue3-styled-components";

const navProps = {theme: Object};

export const StyledNav = styled("nav")`
    display: flex;
    max-height: 10vh;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.alt};
`;

export const StyledLogoDiv = styled("div")`
    padding: 1rem 6%;
`;


export const StyledLogoText = styled("h2")`
    gap: 1.75rem;
    font-weight: bold;
    font-size: clamp(1rem, 2rem, 2.25rem);
    color: ${props => props.theme.primary};
    &:hover {
        filter: brightness(90%)
    }
`;

export const SearchBarDiv = styled("div")`
    background: ${props => props.theme.neutralLight};
    border-radius: 9px;
    gap: 3rem;
    margin: auto;
    text-align: center;
    padding: 0rem clamp(0.4rem, 0.4rem, 0.1rem);
    width: clamp(50%, 70%, 30%);
    color: ${props => props.theme.fontColor};
`;

export const SearchBar = styled("input")`
    width: clamp(90%, 90%, 30%);
`;


export const RightPanel = styled("div")`
    gap: 2rem;
`;


