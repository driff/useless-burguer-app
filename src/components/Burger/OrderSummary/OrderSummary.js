import React, {Component} from 'react';
import Auxiliar from "../../../hoc/Auxiliar/Auxiliar";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('order summary will update');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(key =>
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                </li>
            );

        return (
            <Auxiliar>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType="Danger" clicked={this.props.onCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.onContinue}>CONTINUE</Button>
            </Auxiliar>
        )
    }
}

export default OrderSummary;
