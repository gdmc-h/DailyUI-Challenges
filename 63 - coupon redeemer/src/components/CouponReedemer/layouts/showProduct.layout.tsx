import {FunctionComponent} from "react";
import styled from "styled-components";

interface Props {
    product_img: string;
    product: string;
}

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column; 
    text-align: center;
    flex: 5;
    justify-content: space-evenly;
`;

const ProductImage = styled.div`
    text-align: center;
    & > img {
      border-radius: 5px;
      width: 250px;
      height: 250px;
      box-shadow: 0px 0px 4px rgba(0,0,0,.3);
    }
`;

const ShowProduct: FunctionComponent<Props> = function (props) {
    return(
        <ProductContainer data-testid={"show-layout"}>
            <ProductImage>
                <img alt={props.product} src={props.product_img}/>
            </ProductImage>
            <h1>Congratulations! 🎉</h1>
            <div>
                <p>You just received a free {props.product}!!!</p>
                <p>Your prize will be shipped as soon as possible 🤩</p>
            </div>

        </ProductContainer>
    );
}

export default ShowProduct;
