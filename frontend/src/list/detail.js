import React, { useCallback, useState } from "react";
import {
	Modal,
	Select,
	Form,
	Input,
	TimePicker,
	DatePicker,
	InputNumber,
} from "antd";
import * as moment from "moment";
import authFetch from "../ajax";
import { parseJwt } from "../auth";

const { Option } = Select;

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
const Detail = (props) => {
	const jwtObj = parseJwt(localStorage.getItem("jwt"));
	const { reloadList } = props;
	const {
		isModalVisible,
		setIsModalVisible,
		data: { create },
	} = props;
	const [data, setData] = useState({
		arrivalTime: props.data.arrivalTime
			? typeof props.data.arrivalTime === "string"
				? new moment(props.data.arrivalTime)
				: new moment()
			: new moment(),
		guestName: props.data.guestName || jwtObj.name,
		contactInfo: props.data.contactInfo || jwtObj.contactInfo,
		tableSize: props.data.tableSize || 2,
		operatorName: jwtObj.name,
	});

	const [form] = Form.useForm();

	const initData = () => {
		setData({
			arrivalTime: props.data.arrivalTime
				? typeof props.data.arrivalTime === "string"
					? new moment(props.data.arrivalTime)
					: new moment()
				: new moment(),
			guestName: props.data.guestName || jwtObj.name,
			contactInfo: props.data.contactInfo || jwtObj.contactInfo,
			tableSize: props.data.tableSize || 2,
			operatorName: jwtObj.name,
		});
	};
	const guestNameOnChange = useCallback(
		(userNameEvt) => {
			setData({ ...data, guestName: userNameEvt.currentTarget.value });
		},
		[data]
	);
	const contactInfoOnChange = useCallback(
		(contactInfoEvt) => {
			setData({ ...data, contactInfo: contactInfoEvt.currentTarget.value });
		},
		[data]
	);

	const timerOnChange = useCallback(
		(newTime) => {
			setData({ ...data, arrivalTime: newTime });
		},
		[data]
	);
	const dateOnChange = useCallback(
		(newTime) => {
			setData({ ...data, arrivalTime: newTime });
		},
		[data]
	);
	const tableSizeOnChange = useCallback(
		(size) => {
			setData({ ...data, tableSize: size });
		},
		[data]
	);
	const handleOk = useCallback(() => {
		authFetch(
			window.location.protocol +
			"//" +
			window.location.hostname +
			":" +
			window.location.port +
			"/reservation" +
			`${create ? "" : "/" + props.data._id}`,
			{
				method: create ? "post" : "put",
				headers: {
					"Content-Type": "application/json",
				},
				doAuth: true,
				payload: JSON.stringify({
					...data,
					operatorName: jwtObj.name,
				}),
			},
			(err, status, result) => {
				err && console.error(err);
				initData();
				setIsModalVisible(false);
				form.resetFields();
				reloadList();
			}
		);
	}, [data]);

	const handleCancel = useCallback(() => {
		initData();
		form.resetFields();
		setIsModalVisible(false);
	}, []);

	const disableDate = useCallback((date) => {
		if (date < new Date()) {
			if (date.format("yyyy-MM-DD") === new moment().format("yyyy-MM-DD")) {
				return false;
			} else {
				return true;
			}
		}
		return false;
	}, []);

	const handleSelectChange = useCallback(
		(status) => {
			setData({ ...data, status });
		},
		[data]
	);

	return (
		<>
			<Modal
				title="Reservation Detail"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form
					{...formItemLayout}
					form={form}
					name="reservationDetail"
					scrollToFirstError
				>
					<Form.Item
						name="guestname"
						label="Guest Name"
						rules={[
							{
								required: true,
								whitespace: true,
							},
						]}
					>
						<Input
							value={data.guestName}
							defaultValue={data.guestName}
							onChange={guestNameOnChange}
						/>
					</Form.Item>

					<Form.Item
						name="contactInfo"
						label="Contact Info"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input
							value={data.contactInfo}
							defaultValue={data.contactInfo}
							onChange={contactInfoOnChange}
						/>
					</Form.Item>

					<Form.Item
						name="arrivalTime"
						label="Arrival Time"
						rules={[
							{
								required: true,
							},
						]}
					>
						<DatePicker
							disabledDate={disableDate}
							onChange={dateOnChange}
							value={data.arrivalTime}
						/>
						<TimePicker
							onChange={timerOnChange}
							value={data.arrivalTime}
							format={"HH:mm"}
							minuteStep={15}
						/>
					</Form.Item>
					<Form.Item
						name="tableSize"
						label="Table Size"
						rules={[
							{
								required: true,
							},
						]}
					>
						<InputNumber
							min={1}
							max={10}
							value={data.tableSize}
							defaultValue={data.tableSize}
							onChange={tableSizeOnChange}
						/>
					</Form.Item>

					{jwtObj.type === "employee" && (
						<Form.Item name="status" label="Status">
							<Select defaultValue="Pending" onChange={handleSelectChange}>
								<Option value="Completed">Completed</Option>
								<Option value="Cancelled">Cancelled</Option>
								<Option value="Pending">Pending</Option>
							</Select>
						</Form.Item>
					)}
				</Form>
			</Modal>
		</>
	);
};
export default Detail;
