import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Tasks.css";
import "./css/AddTask.css";
import "./css/Header.css";
import "./css/TaskManager.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

const Tasks = () => {
	const currentDate = moment().format("dddd, Do");
	const month = moment().format("MMMM");
	const [task, setTask] = useState("");
	const [tasks, getTasks] = useState([]);
	const [updateStatus, setUpdateStatus] = useState([]);
	const [activeLink, setActiveLink] = useState("all");
	const [count, setCount] = useState(0);

	const handleInputChange = (event) => {
		setTask(event.target.value);
	};

	// adding the todo task to database
	const addTask = (event) => {
		setActiveLink("all");
		const data = {
			content: task,
			completed: false,
		};
		let url = "http://127.0.0.1:8000/addTodo/";
		console.log(updateStatus.length);
		console.log(updateStatus !== []);
		if (updateStatus.length !== 0) {
			url += `${updateStatus["id"]}/`;
		}
		console.log(url);
		axios
			.post(url, data)
			.then((response) => {
				console.log(response.status);
				if (response.status === 201) {
					setUpdateStatus([]);
				}
			})
			.catch((error) => {
				console.log(error.response.data.content[0]);
			});
		console.log(tasks);
		setTask("");
		fetchData(activeLink);
	};

	// retrieving todos from database
	const fetchData = async (activeLink) => {
		try {
			const response = await axios.get("http://127.0.0.1:8000/todo/", {
				params: { activeLink: activeLink },
			});
			// console.log(response.data.count);
			getTasks(response.data.data.todos);
			setCount(response.data.count);
		} catch (error) {
			console.log(error.response.data.content[0]);
		}
	};

	// handling the checkbox to be checked or unchecked
	const handleCheckboxChange = (e, pk) => {
		axios
			.post(`http://127.0.0.1:8000/toggle/${pk}/`)
			.then((response) => {
				console.log(response.data);
				fetchData(activeLink);
			})
			.catch((error) => {
				console.log(error.error);
			});
	};

	//toggling the active classes between links
	const handleLinkClick = (link) => {
		setActiveLink(link);
		fetchData(activeLink);
	};

	// clears all the task from the db
	const deleteTask = (e, pk) => {
		let url = "http://127.0.0.1:8000/delete/";
		if (pk !== undefined && pk !== null) {
			console.log("ENTERED");
			url += `${pk}/`;
		}
		axios
			.delete(url)
			.then((response) => {
				console.log(response.data);
				console.log(response.status);
				if (response.status === 200) {
					getTasks([]);
				} else {
					const updatedState = tasks.filter((obj) => obj.id !== pk);
					getTasks(updatedState);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		setCount(0);
	};

	const editTask = (e, pk, index) => {
		let content = tasks[index]["content"];
		setTask(content);
		setUpdateStatus({ status: "true", id: pk });
	};

	useEffect(() => {
		fetchData(activeLink);
	}, [activeLink, task]);

	return (
		<>
			<div className="header">
				<div className="date">
					<h4>{currentDate}</h4>
					<p>{month}</p>
				</div>
				<div className="taskCount">
					<p>{count} tasks</p>
				</div>
			</div>
			<div className="taskManageContainer">
				<div className="manageLinks">
					<Link
						className={`link ${
							activeLink === "all" ? "active" : ""
						}`}
						to="#"
						onClick={() => handleLinkClick("all")}
					>
						All
					</Link>
					<Link
						className={`link ${
							activeLink === "pending" ? "active" : ""
						}`}
						to="#"
						onClick={() => handleLinkClick("pending")}
					>
						Pending
					</Link>
					<Link
						className={`link ${
							activeLink === "completed" ? "active" : ""
						}`}
						to="#"
						onClick={() => handleLinkClick("completed")}
					>
						Completed
					</Link>
				</div>
				<div className="clearBtn">
					<button onClick={deleteTask}>Clear All</button>
				</div>
			</div>
			<div className="listContainer">
				{tasks.map((task, index) => (
					<>
						<div key={task.id} className="list">
							<div className="listItems">
								<input
									checked={task.completed}
									onChange={(e) =>
										handleCheckboxChange(e, task.id)
									}
									className="checkList"
									type="checkbox"
								/>
								<p
									className={task.completed ? "strike" : ""}
									key={task.id}
								>
									{task.content}
								</p>
							</div>
							<div></div>
							<div className="options">
								<div className="btn-container">
									<i
										onClick={(e) => deleteTask(e, task.id)}
										className="fa-regular fa-trash-can"
									></i>
									<i
										onClick={(e) =>
											editTask(e, task.id, index)
										}
										class="fa-regular fa-pen-to-square"
									></i>
									<i className="fa-regular fa-eye"></i>
								</div>
							</div>
						</div>
					</>
				))}
			</div>
			<div className="inputs">
				<div className="taskInput">
					<input
						value={task}
						onChange={handleInputChange}
						type="text"
						placeholder="Enter Your Task"
					/>
				</div>
				<div onClick={addTask} className="taskAdd">
					<button>
						<i
							className={
								updateStatus["status"]
									? "fa-regular fa-pen-to-square"
									: "fa-regular fa-plus"
							}
						></i>
					</button>
				</div>
			</div>
		</>
	);
};

export default Tasks;
