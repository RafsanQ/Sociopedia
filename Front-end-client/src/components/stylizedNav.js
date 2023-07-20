import styled from "vue3-styled-components";

const navProps = {theme: Object};

export const StyledNav = styled("nav")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: -v-bind(alt);
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

`;