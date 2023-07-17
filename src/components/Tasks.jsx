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
	const [activeLink, setActiveLink] = useState("all");
	const [count, setCount] = useState(0);

	const handleInputChange = (event) => {
		setTask(event.target.value);
	};

	// adding the todo task to database
	const addTask = (event) => {
		setActiveLink("all");
		event.preventDefault();
		const data = {
			content: task,
			completed: false,
		};
		axios
			.post("http://127.0.0.1:8000/addTodo/", data)
			.then((response) => {
				console.log(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response.data.content[0]);
			});
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
	const deleteTask = () => {
		axios
			.delete("http://127.0.0.1:8000/delete/")
			.then((response) => {
				console.log(response.data);
				getTasks([]);
			})
			.catch((error) => {
				console.log(error);
			});
		setCount(0);
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
							<div className="options">
								<i className="fa-solid fa-ellipsis"></i>
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
						<i className="fa-regular fa-plus"></i>
					</button>
				</div>
			</div>
		</>
	);
};

export default Tasks;
