import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const [hoveredIndex, setHoveredIndex] = useState(null);
  
	const handleMouseEnter = (index) => {
	  setHoveredIndex(index);
	};
  
	const handleMouseLeave = () => {
	  setHoveredIndex(null);
	};
  
	return (
	  <div className="container">
		<h1>todos</h1>
		<ul>
		  <li>
			<input
			  type="text"
			  onChange={(e) => setInputValue(e.target.value)}
			  value={inputValue}
			  onKeyPress={(e) => {
				if (e.key === "Enter") {
				  setTodos(todos.concat([inputValue]));
				  setInputValue("");
				}
			  }}
			  placeholder="What needs to be done?"
			></input>
		  </li>
		  {todos.length === 0 ? (
			<li>No tasks, add a task</li>
		  ) : (
			todos.map((item, index) => (
			  <li
				key={index}
				onMouseEnter={() => handleMouseEnter(index)}
				onMouseLeave={handleMouseLeave}
			  ><div className="task-list-item">
				{item}{" "}
				{hoveredIndex === index && (
			   <div className= "icon"> <FontAwesomeIcon
					icon={faTrash}
					onClick={() =>
					  setTodos(
						todos.filter((t, currentIndex) => index !== currentIndex)
					  )
					}
				  /></div>
				)}</div>
			  </li>
			))
		  )}
		</ul>
		<div>{todos.length} tasks</div>
	  </div>
	);
  };

export default Home;
