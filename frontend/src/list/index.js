import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
	Table,
	Button,
	message,
	Layout,
	Row,
	Col,
	Popconfirm,
	Space
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as moment from "moment";
import { cloneDeep } from "lodash";

import authFetch from "../ajax";
import { parseJwt } from "../auth";
import Detail from "./detail";
import Logout from "../logout";

import "./index.css";

const { Content } = Layout;
const fakeDataUrl =
	window.location.protocol +
	"//" +
	window.location.hostname +
	":" +
	window.location.port +
	`/reservation`;

const LoadMoreList = () => {
	const [state, setState] = useState({
		loading: false,
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});
	const jwtObj = parseJwt(localStorage.getItem("jwt"));

	const columns = useMemo(() => {
		return [
			{
				title: 'Guest Name',
				dataIndex: 'guestName',
				key: 'guestName',
				sorter: (a, b) => {
					if (a.guestName < b.guestName) {
						return -1;
					}
					if (a.guestName > b.guestName) {
						return 1;
					}
					return 0;
				},
				width: '20%',
			},
			{
				title: 'Arrival Time',
				dataIndex: 'arrivalTime',
				key: 'arrivalTime',
				render: (arrivalTime) => new moment(arrivalTime).format("yyyy-MM-DD HH:mm"),
				sorter: (a, b) => moment(a.arrivalTime) - moment(b.arrivalTime),
				width: '20%',
			},
			{
				title: 'Table Size',
				dataIndex: 'tableSize',
				key: 'tableSize',
				sorter: (a, b) => a.tableSize - b.tableSize,
				width: '20%',
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
				sorter: (a, b) => {
					if (a.status < b.status) {
						return -1;
					}
					if (a.status > b.status) {
						return 1;
					}
					return 0;
				},
				width: '20%',
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, record) => (
					<Space size="middle">
						<a
							disabled={
								jwtObj.type !== "employee" &&
								(record.status == "Cancelled" ||
									record.status == "Completed")
							}
							key="list-loadmore-edit"
							onClick={() => {
								actionBind(cloneDeep(record));
							}}
						>edit</a>
						<Popconfirm
							title="Are you sure？"
							icon={<QuestionCircleOutlined style={{ color: "red" }} />}
							onConfirm={cancelConfirm(record)}
						>
							<a
								href="#"
								disabled={
									jwtObj.type === "employee" ||
									record.status == "Cancelled" ||
									record.status == "Completed"
								}
								key="list-loadmore-more"
							>cancel</a>
						</Popconfirm>
					</Space>
				),
			},
		]
	}, [state.data]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [modalData, setModaldata] = useState({});
	useEffect(() => {
		getData();
	}, []);

	const getData = useCallback((callback) => {
		setState({ ...state, loading: true });
		authFetch(
			fakeDataUrl,
			{
				method: "get",
				contentType: "application/json",
				doAuth: true,
				// "Accept-Encoding": "gzip, deflate, br",
			},
			(err, status, data) => {
				err &&
					message.error(
						`Error happens, it may caused by token, please relogin manually.`
					);
				!err &&
					setState({
						...state,
						loading: false,
						list: data
					});
			}
		);
	}, []);

	const actionBind = useCallback((item) => {
		setModaldata({ ...item });
		setIsModalVisible(true);
	}, []);
	const cancelConfirm = useCallback((item) => {
		return (e) => {
			authFetch(
				fakeDataUrl + "/" + item._id,
				{
					method: "delete",
					doAuth: true,
				},
				(err, status, data) => {
					err && console.error(err);
					getData();
				}
			);
		};
	}, []);

	return (
		<Layout style={{ height: "100%" }}>
			<Content>
				<Row justify="center" align="middle" style={{ height: "60vh" }}>
					<Col span={12}>
						<Table
							columns={columns}
							rowKey={record => record._id}
							dataSource={state.list}
							pagination={state.pagination}
							loading={state.loading}
						/>
					</Col>
				</Row>
				<Row justify="center" align="middle" style={{ height: "15vh" }}>
					<Col span={4} style={{ display: "flex", justifyContent: 'center' }}>
						<Button
							type="primary"
							disabled={jwtObj.type === "employee"}
							onClick={() => {
								actionBind({ create: true });
							}}
						>
							New Reservation
						</Button>
					</Col>
					<Col span={4} style={{ display: "flex", justifyContent: 'center' }}>
						<Logout />
					</Col>
				</Row>
			</Content>
			{isModalVisible && (
				<Detail
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					reloadList={getData}
					data={{ ...modalData }}
				/>
			)}
		</Layout>
	);
};

export default LoadMoreList;
