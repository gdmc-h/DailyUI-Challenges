import {FunctionComponent, Fragment, useEffect, useState} from "react";
import styled from "styled-components";

interface Props {
    message: string
}

const AlertComponent = styled.div`
    font-size: 12px;
    color:#FB5012;
    margin-top: 15px;
`;

const AlertUI: FunctionComponent<Props> = function(props) {

    return(
       <AlertComponent data-testid={'alert'}>
           {props.message}
       </AlertComponent>
    );
}


export default AlertUI;
