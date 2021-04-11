import React, {Component} from "react";

import {List, Avatar, Button, Skeleton} from "antd";
import {fetchUrl} from "fetch";

import Detail from "./detail";

const count = 3;
const fakeDataUrl = `http://localhost:3000/reservation`;

class LoadMoreList extends React.Component {
	state = {
		initLoading: true,
		loading: false,
		list: [],
	};

	componentDidMount() {
		this.getData((res) => {
			this.setState({
				initLoading: false,
				list: res,
			});
		});
	}

	getData = (callback) => {
		fetchUrl(
			fakeDataUrl,
			{
				method: "get",
				// contentType: "application/json",
				"Accept-Encoding": "gzip, deflate, br",
			},
			(err, status, data) => {
				err && console.error(err);
				console.log(data);
				callback(JSON.parse(data.toString()));
			}
		);
	};

	render() {
		const {initLoading, loading, list} = this.state;

		return (
			<>
				<List
					className="demo-loadmore-list"
					loading={initLoading}
					itemLayout="horizontal"
					dataSource={list}
					renderItem={(item) => (
						<List.Item
							actions={[
								<a
									disabled={
										item.status == "cancel" || item.status == "completed"
									}
									key="list-loadmore-edit"
								>
									edit
								</a>,
								<a
									disabled={
										item.status == "cancel" || item.status == "completed"
									}
									key="list-loadmore-more"
								>
									cancel
								</a>,
							]}
						>
							<List.Item.Meta title={item.arrivalTime} />
							<List.Item.Meta title={item.tableSet} />
							<List.Item.Meta title={item.status} />
							{/* <Skeleton avatar title={false} loading={item.loading} active>
							<div>content</div>
						</Skeleton> */}
						</List.Item>
					)}
				/>
				<Detail />
			</>
		);
	}
}

// ReactDOM.render(<LoadMoreList />, mountNode);
export default LoadMoreList;
