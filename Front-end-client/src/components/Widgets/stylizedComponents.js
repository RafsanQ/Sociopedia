import styled from "vue3-styled-components";
import { useMediaQuery } from "@vueuse/core";


export const WidgetWrapper = styled('div')`
    padding: 1.5rem 1.5rem 0.75rem 1.5rem;
    background-color: ${props => props.theme.alt};
    border-radius: 0.75rem;
    width: clamp(30%, 30%, 20%);
    border-radius: 10px;
    margin: 2% auto;
    align-items: left;
    text-align: left;
    color: ${props => props.theme.fontColor};
`;

