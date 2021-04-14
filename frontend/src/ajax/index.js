import {fetchUrl} from "fetch";
import {parseJwt} from "../auth";

const authFetch = (url, options, callback) => {
	let jwtObj = parseJwt(localStorage.getItem("jwt"));
	options.headers = options.headers || {};
	if (jwtObj) {
		options.headers["Authorization"] = "Bearer " + localStorage.getItem("jwt");
	}
	// options.decompress = false;
	// options.disableGzip = false;
	// options.headers["Accept-Encoding"] = "gzip";
	fetchUrl(url, options, (err, status, data) => {
		if (err) {
			callback(err, status, data);
			return;
		}
		if (status.status === 401) {
			window.location.assign("/");
		} else {
			callback(err, status, data);
		}
	});
};

export default authFetch;
