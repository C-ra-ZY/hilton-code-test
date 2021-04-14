import React, {useState, useEffect, useCallback} from "react";
import "./index.css";
import {parseJwt} from "../auth";

import {
	List,
	Avatar,
	Button,
	message,
	Layout,
	Row,
	Col,
	Popconfirm,
} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import * as moment from "moment";
import {cloneDeep} from "lodash";

import authFetch from "../ajax";

import Detail from "./detail";
import Logout from "../logout";

const {Header, Footer, Sider, Content} = Layout;
const count = 3;
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
	});
	const jwtObj = parseJwt(localStorage.getItem("jwt"));

	const [isModalVisible, setIsModalVisible] = useState(false);

	const [modalData, setModaldata] = useState({});
	useEffect(() => {
		getData();
	}, []);

	const getData = useCallback((callback) => {
		setState({...state, loading: true});
		authFetch(
			fakeDataUrl,
			{
				method: "get",
				contentType: "application/json",
				// "Accept-Encoding": "gzip, deflate, br",
			},
			(err, status, data) => {
				err &&
					message.error(
						`Error happens, it may caused by token, please relogin manually.`
					);
				!err &&
					setState({
						loading: false,
						list: JSON.parse(data.toString()),
					});
			}
		);
	}, []);

	const actionBind = useCallback((item) => {
		setModaldata({...item});
		setIsModalVisible(true);
	}, []);
	const cancelConfirm = useCallback((item) => {
		return (e) => {
			authFetch(
				fakeDataUrl + "/" + item._id,
				{
					method: "delete",
				},
				(err, status, data) => {
					err && console.error(err);
					getData();
				}
			);
		};
	}, []);
	const {loading, list} = state;

	return (
		<Layout style={{height: "100%"}}>
			<Content>
				<Row justify="center" align="middle" style={{height: "60vh"}}>
					<Col span={12}>
						<List
							className="demo-loadmore-list"
							loading={loading}
							itemLayout="horizontal"
							dataSource={list}
							renderItem={(item) => (
								<List.Item
									actions={[
										<a
											disabled={
												jwtObj.type !== "employee" &&
												(item.status == "Cancelled" ||
													item.status == "Completed")
											}
											key="list-loadmore-edit"
											onClick={() => {
												actionBind(cloneDeep(item));
											}}
										>
											edit
										</a>,
										<Popconfirm
											title="Are you sure？"
											icon={<QuestionCircleOutlined style={{color: "red"}} />}
											onConfirm={cancelConfirm(item)}
										>
											<a
												href="#"
												disabled={
													jwtObj.type === "employee" ||
													item.status == "Cancelled" ||
													item.status == "Completed"
												}
												key="list-loadmore-more"
											>
												cancel
											</a>
										</Popconfirm>,
									]}
								>
									<List.Item.Meta
										title={new moment(item.arrivalTime).format(
											"yyyy-MM-DD HH:mm"
										)}
									/>
									<List.Item.Meta title={item.guestName} />
									<List.Item.Meta title={item.tableSet} />
									<List.Item.Meta title={item.status} />
								</List.Item>
							)}
						/>
					</Col>
				</Row>
				<Row justify="center" align="middle" style={{height: "15vh"}}>
					<Col span={4}>
						<Button
							type="primary"
							disabled={jwtObj.type === "employee"}
							onClick={() => {
								actionBind({create: true});
							}}
						>
							New Reservation
						</Button>
					</Col>
					<Col span={4}>
						<Logout />
					</Col>
				</Row>
			</Content>
			{isModalVisible && (
				<Detail
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					reloadList={getData}
					data={{...modalData}}
				/>
			)}
		</Layout>
	);
};

// ReactDOM.render(<LoadMoreList />, mountNode);
export default LoadMoreList;
