import React from 'react';
import Auxiliar from "../../../hoc/Auxiliar";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key =>
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
            </li>
        );
    return (
        <Auxiliar>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
        </Auxiliar>
    )
};

export default orderSummary;
