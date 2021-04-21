import { forwardRef} from "react";
import styled from "styled-components";

interface Props {
    [x: string]: any
}

const InputComponent = styled.input`
    text-align: center;
  padding: 20px;
  font-size: 14px;
`;

const InputUI = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    return(
            <InputComponent ref={ref} {...props} />
        );
});


export default InputUI;
