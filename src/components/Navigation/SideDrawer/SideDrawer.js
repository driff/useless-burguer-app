import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';
import Auxiliar from "../../../hoc/Auxiliar/Auxiliar";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Auxiliar>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxiliar>
    );
};

export default sideDrawer;
