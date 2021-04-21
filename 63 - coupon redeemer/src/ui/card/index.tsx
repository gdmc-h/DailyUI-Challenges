import {FunctionComponent} from "react";
import styled from "styled-components";

const CardUI = styled.div`
  background-color: #fefefe;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
  border: 2px solid #ffffff;
  min-width: 300px;
  min-height: 500px;
  width: 30vw;
  
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Card: FunctionComponent = function({children}) {
    return(
        <CardUI>
            {children}
        </CardUI>
    );
}

export default Card;
