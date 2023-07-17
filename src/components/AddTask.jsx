import axios from "axios";
import "./css/AddTask.css";
import React from "react";
import { useState } from "react";

const AddTask = () => {
	const [task, setTask] = useState("");

	const handleInputChange = (event) => {
		setTask(event.target.value);
	};

	const addTask = (event) => {
		event.preventDefault();
		const data = {
			content: task,
			completed: false,
		};
		axios
			.post("http://127.0.0.1:8000/addTodo/", data)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response.data.content[0]);
			});
		setTask("");
	};
	return (
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
	);
};

export default AddTask;
