import { useEffect, useRef, useState } from "react";
import "./App.css";
import { SunIcon, MoonIcon } from "./assets";
import Task from "./components/Task";

function App() {
  const defaultTheme =
    JSON.parse(localStorage.getItem("theme")) ??
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [darkTheme, setDarkTheme] = useState(defaultTheme);

  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const myRef = useRef();

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  const regex = /.{1,}/i;

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (regex.test(newTask)) {
      const task = {
        id: taskList.length == 0 ? 1 : taskList[taskList.length - 1].id + 1,
        taskName: newTask,
        completed: false,
      };
      setTaskList((prev) => [...prev, task]);
      myRef.current.value = "";
      setNewTask("");
    } else {
      return;
    }
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((el) => el.id !== id));
  };

  const completeTask = (id) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id == id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };

  const clearCompleted = () => {
    setTaskList(taskList.filter((task) => task.completed !== true));
  };

  const leftItems = taskList.filter((task) => task.completed !== true).length;

  const completedTasks = taskList.filter((task) => task.completed == true);
  const activeTasks = taskList.filter((task) => task.completed !== true);

  const handleComplete = () => {
    setShowAll(false);
    setShowActiveOnly(false);
    setShowCompletedOnly(true);
  };

  const handleActive = () => {
    setShowAll(false);
    setShowCompletedOnly(false);
    setShowActiveOnly(true);
  };

  const handleAllTasks = () => {
    setShowActiveOnly(false);
    setShowCompletedOnly(false);
    setShowAll(true);
    console.log(showAll);
  };

  return (
    <main className={darkTheme ? "" : "light"}>
      <div className="Head">
        <div className="Head-HeaderBox">
          <h1 className="Head-HeaderBox-Title">todo</h1>
          <img
            src={darkTheme ? SunIcon : MoonIcon}
            alt=""
            onClick={() => setDarkTheme((prev) => !prev)}
          />
        </div>
        <div className="Head-InputsBox">
          <input
            type="checkbox"
            name="check"
            id="check"
            className="Head-Check"
            onChange={addTask}
          />
          <input
            type="text"
            id="newTask"
            className="Head-NewTask"
            ref={myRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              } else {
                return;
              }
            }}
            onChange={handleChange}
            placeholder="Create a new todo..."
          />
        </div>
      </div>

      <div className="List">
        {showActiveOnly
          ? activeTasks.map((task) => (
              <Task
                key={task.id}
                taskName={task.taskName}
                id={task.id}
                deleteTask={deleteTask}
                completed={task.completed}
                completeTask={completeTask}
              />
            ))
          : showCompletedOnly
          ? completedTasks.map((task) => (
              <Task
                key={task.id}
                taskName={task.taskName}
                id={task.id}
                deleteTask={deleteTask}
                completed={task.completed}
                completeTask={completeTask}
              />
            ))
          : taskList.map((task) => (
              <Task
                key={task.id}
                taskName={task.taskName}
                id={task.id}
                deleteTask={deleteTask}
                completed={task.completed}
                completeTask={completeTask}
              />
            ))}
        <div className="List-Btns">
          <button className="LeftItemsBtn">{leftItems} Items left</button>
          <button
            className={showAll ? "AllBtn colored" : "AllBtn"}
            onClick={handleAllTasks}
          >
            All
          </button>
          <button
            className={showActiveOnly ? "ActiveBtn colored" : "ActiveBtn"}
            onClick={handleActive}
          >
            Active
          </button>
          <button
            className={
              showCompletedOnly ? "CompleteBtn colored" : "CompleteBtn"
            }
            onClick={handleComplete}
          >
            Completed
          </button>
          <button className="ClearBtn" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
