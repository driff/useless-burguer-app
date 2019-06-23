import React from 'react';
import classes from './Burger.module.css';
import BurguerIngredient from "./BurgerIngredient/BurguerIngredient";

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(value => {
            return [...Array(props.ingredients[value])].map((_, index) => {
                return <BurguerIngredient key={value + index} type={value} />;
            })
        }).reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurguerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
