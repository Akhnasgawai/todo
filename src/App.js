import "./App.css";
import React, { useState } from "react";
import Tasks from "./components/Tasks";

function App() {
	return (
		<>
			<div className="main-container">
				<Tasks />
			</div>
		</>
	);
}

export default App;
