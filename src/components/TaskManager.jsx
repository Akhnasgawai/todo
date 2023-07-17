import { Link } from "react-router-dom";
import "./css/TaskManager.css";
import React from "react";

const TaskManager = () => {
	return (
		<>
			<div className="taskManageContainer">
				<div className="manageLinks">
					<Link className="link" to="#">
						All
					</Link>
					<Link className="link" to="#">
						Pending
					</Link>
					<Link className="link" to="#">
						Completed
					</Link>
				</div>
				<div className="clearBtn">
					<button>Clear All</button>
				</div>
			</div>
		</>
	);
};

export default TaskManager;
