import React from "react";
import { Route, Switch } from "react-router";
import Login from "../Component/Login";
import SingUp from "../Component/SingUp";
import User from "../Component/User";

const HomeRoute = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Login}></Route>
				<Route exact path='/singup' component={SingUp}></Route>
				<Route exact path='/user' component={User}></Route>
			</Switch>
		</>
	);
};

export default HomeRoute;
