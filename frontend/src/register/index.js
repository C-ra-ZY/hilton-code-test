import React, {useState, useCallback} from "react";
import {
	Form,
	Input,
	Cascader,
	Select,
	Row,
	Col,
	Checkbox,
	Button,
	AutoComplete,
	Layout,
} from "antd";
import {fetchUrl} from "fetch";
const {Header, Footer, Sider, Content} = Layout;
const {Option} = Select;
const residences = [
	{
		value: "zhejiang",
		label: "Zhejiang",
		children: [
			{
				value: "hangzhou",
				label: "Hangzhou",
				children: [
					{
						value: "xihu",
						label: "West Lake",
					},
				],
			},
		],
	},
	{
		value: "jiangsu",
		label: "Jiangsu",
		children: [
			{
				value: "nanjing",
				label: "Nanjing",
				children: [
					{
						value: "zhonghuamen",
						label: "Zhong Hua Men",
					},
				],
			},
		],
	},
];
const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 8,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const RegistrationForm = () => {
	const [form] = Form.useForm();
	const formSubmit = useCallback(() => {
		// console.log(form);
		// form.submit();
		fetchUrl(
			"http://localhost:3000/user",
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				payload: JSON.stringify(form.getFieldsValue()),
			},
			(err, data) => {
				err && console.error(err);
				console.log(data);
				!err && window.history.pushState({}, "", "/login");
			}
		);
	}, [form]);
	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

	const [autoCompleteResult, setAutoCompleteResult] = useState([]);
	return (
		<Layout style={{height: "100%"}}>
			<Content>
				<Row justify="center" align="middle" style={{height: "100%"}}>
					<Col span={12}>
						<Form
							{...formItemLayout}
							form={form}
							name="register"
							onFinish={onFinish}
							initialValues={{
								residence: ["zhejiang", "hangzhou", "xihu"],
								prefix: "86",
							}}
							scrollToFirstError
						>
							<Form.Item
								name="nickname"
								label="Nickname"
								tooltip="What do you want others to call you?"
								rules={[
									{
										required: true,
										message: "Please input your nickname!",
										whitespace: true,
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										required: true,
										message: "Please input your password!",
									},
								]}
								hasFeedback
							>
								<Input.Password />
							</Form.Item>

							<Form.Item
								name="confirm"
								label="Confirm Password"
								dependencies={["password"]}
								hasFeedback
								rules={[
									{
										required: true,
										message: "Please confirm your password!",
									},
									({getFieldValue}) => ({
										validator(_, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve();
											}

											return Promise.reject(
												new Error(
													"The two passwords that you entered do not match!"
												)
											);
										},
									}),
								]}
							>
								<Input.Password />
							</Form.Item>

							<Form.Item
								name="phone"
								label="Phone Number"
								rules={[
									{
										required: true,
										message: "Please input your phone number!",
									},
								]}
							>
								<Input
									style={{
										width: "100%",
									}}
								/>
							</Form.Item>

							<Form.Item {...tailFormItemLayout}>
								<Button type="primary" htmlType="submit" onClick={formSubmit}>
									Register
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
};

export default RegistrationForm;
