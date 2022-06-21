import { parseJwt } from "../auth";
import reqwest from "reqwest";

const authFetch = (url, options, callback) => {
	let jwtObj = parseJwt(localStorage.getItem("jwt"));
	options.headers = options.headers || {};
	if (jwtObj) {
		options.headers["Authorization"] = "Bearer " + localStorage.getItem("jwt");
	}
	if (options.payload) {
		options.data = options.payload
		delete options['payload']
	}
	reqwest({
		url, type: 'json', ...options
		, error: function (err) {
			if (options.doAuth && err.status === 401) {
				window.localStorage.removeItem("jwt")
				window.location.assign(window.location.pathname);
			} else {
				callback(err, { status: err.status }, undefined)
			}
		}
		, success: function (resp) {
			callback(undefined, {}, resp)
		}
	})
};

export default authFetch;
