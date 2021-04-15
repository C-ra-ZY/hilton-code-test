import React, { useState, useCallback } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import authFetch from "../ajax";
import { Redirect } from "react-router-dom";
import { Row, Col, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const NormalLoginForm = (props) => {
	const [form] = Form.useForm();
	const doLogin = useCallback(() => {
		authFetch(
			window.location.protocol +
			"//" +
			window.location.hostname +
			":" +
			window.location.port +
			"/login",
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				payload: JSON.stringify(form.getFieldsValue()),
				doAuth: false
			},
			(err, { status }, data) => {
				err && console.error(err);
				if (status === 401) {
					message.warning(
						"Login failed, please check your username and password!"
					);
				} else {
					localStorage.setItem("jwt", data.token);
					window.location.reload();
				}
			}
		);
	}, []);

	let jwt = localStorage.getItem("jwt");
	if (jwt) {
		return <Redirect to={"/list"} />;
	}

	return (
		<Layout style={{ height: "100%" }}>
			<Content>
				<Row justify="center" align="middle" style={{ height: "100%" }}>
					<Col span={12}>
						<Form
							form={form}
							name="login"
							className="login-form"
							initialValues={{
								remember: true,
							}}
						// onFinish={onFinish}
						>
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: "Please input your Username!",
									},
								]}
							>
								<Input
									prefix={<UserOutlined className="site-form-item-icon" />}
									placeholder="Username"
								/>
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your Password!",
									},
								]}
							>
								<Input
									prefix={<LockOutlined className="site-form-item-icon" />}
									type="password"
									placeholder="Password"
								/>
							</Form.Item>
							<Form.Item>
								<Form.Item name="remember" valuePropName="checked" noStyle>
									<Checkbox>Remember me</Checkbox>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									className="login-form-button"
									onClick={doLogin}
								>
									Log in
								</Button>
								{" Or "}
								<Link to="/register">register now!</Link>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
};

// ReactDOM.render(<NormalLoginForm />, mountNode);
export default NormalLoginForm;
