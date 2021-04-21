import {FunctionComponent} from "react";
import styled from "styled-components";

interface Props {
    [x: string]: any
}

const ButtonComponent = styled.button`
    background-color: #9395D3;
    border: none;
    padding: 20px;
    border-radius: 100px;
    font-size: 18px;
    color: white;
    
    &:hover{
      opacity: .9;
      cursor: pointer;
    }
`;


const ButtonUI: FunctionComponent<Props> = function(props) {
    return (
        <ButtonComponent {...props}>
            {props.title}
        </ButtonComponent>
    );
}


export default ButtonUI;
