import React from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
const Auth = (Component) => {
	return () => {
		let jwt = localStorage.getItem("jwt");
		return <>{!jwt ? <Redirect to={"/login"} /> : <Component />}</>;
	};
};

export const parseJwt = (jwtToken) => {
	let jwtObj;
	try {
		jwtObj = jwt_decode(jwtToken);
	} catch (err) {
		console.error(err);
	}
	return jwtObj;
};

export default Auth;
