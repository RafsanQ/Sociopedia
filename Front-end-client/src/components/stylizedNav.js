import styled from "vue3-styled-components";

const navProps = {theme: Object};

export const StyledNav = styled("nav")`
    display: flex;
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
    padding: 0.1rem 1.5rem;
`;

export const RightPanel = styled("div")`
    gap: 2rem;
`;


