import React, {useCallback} from "react";
import {Button} from "antd";

const Logout = (props) => {
	const logout = useCallback(() => {
		localStorage.removeItem("jwt");
		window.location.reload();
	}, []);

	return (
		<Button type="primary" onClick={logout}>
			Exit
		</Button>
	);
};

export default Logout;
