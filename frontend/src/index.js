import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import {Switch, Route, HashRouter, Redirect} from "react-router-dom";
import NormalLoginForm from "./login";
import RegistrationForm from "./register";
import LoadMoreList from "./list";
import Auth from "./auth";

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Redirect from="/" to="/list" />
			<Route path="/login" component={NormalLoginForm} />
			<Route path="/register" component={RegistrationForm} />
			<Route path="/list" component={Auth(LoadMoreList)} />
		</HashRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
