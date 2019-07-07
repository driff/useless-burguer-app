import React, {Component} from 'react';
import Auxiliar from "../../hoc/Auxiliar/Auxiliar";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.8
};

class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {};
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        axios.get('https://useless-burgerbuilder.firebaseio.com/ingredients.json').then(value => {
            if(value)
                this.setState({ingredients: value.data})
        });
    }

    updatePurchaseState(updatedIngredients) {
        const ingredients = {...updatedIngredients};
        const sum = Object.keys(ingredients).map(key => ingredients[key])
            .reduce((sum, currentValue) => sum + currentValue, 0);
        this.setState({
            purchasable: sum > 0
        });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount < 1) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Johan Garcia',
                address: {
                    street: 'guayaquil',
                    zipcode: '090303',
                    country: 'Ecuador'
                },
                email: 'asd@asd.com',
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order).then(value =>
            this.setState({loading: false, purchasing: false}))
            .catch(reason => {
                this.setState({loading: false, purchasing: false});
            });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = <Spinner/>
        let orderSummary = null;
        if (this.state.ingredients) {
            burger = <Auxiliar><Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               disabled={disabledInfo}
                               price={this.state.totalPrice}
                               ordered={this.purchaseHandler}
                               purchasable={this.state.purchasable}
                />
            </Auxiliar>;
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         onCancel={this.purchaseCancelHandler}
                                         onContinue={this.purchaseContinueHandler}
                                         price={this.state.totalPrice}
            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        return (
            <Auxiliar>
                {burger}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

            </Auxiliar>
        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);
