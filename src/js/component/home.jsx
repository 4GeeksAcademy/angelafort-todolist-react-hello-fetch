import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const todosURL = "https://playground.4geeks.com/todo/";
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };
  
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    useEffect(() => {
        fetch(todosURL + "users/angelafort")
            .then(response => response.json())
            .then(data => {
                setTodos(data.todos);
            })
            .catch(error => console.error(error));
    }, []);

    function deleteTodo(todoId) {
        fetch(todosURL + "todos/" + todoId,  {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
        })
        .catch(error => console.error(error));
    }

    function addTodo() {
        const newTodo = {
            "label": inputValue
        };

        fetch(todosURL + "todos/angelafort", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setTodos([...todos, data]);
            setInputValue("");
        })
        .catch(error => console.error(error));
    }

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
                                addTodo();
                            }
                        }}
                        placeholder="What needs to be done?"
                    />
                </li>
                {todos.length === 0 ? (
                    <li>No tasks, add a task</li>
                ) : (
                    todos.map((item, index) => (
                        <li
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="task-list-item">
                                {item.label}{" "}
                                {hoveredIndex === index && (
                                    <div className= "icon">
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => deleteTodo(item.id)}
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <div>{todos.length} tasks</div>
        </div>
    );
};

export default Home;
