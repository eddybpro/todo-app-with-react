import PropTypes from "prop-types";
import { CrossIcon } from "../assets";
import "./Task.css";

function Task(props) {
  return (
    <div className="TaskBox">
      <input
        type="checkbox"
        name="listCheck"
        className={
          props.completed ? "TaskBox-CheckBox completed" : "TaskBox-CheckBox"
        }
        onChange={() => props.completeTask(props.id)}
      />
      <p
        className={props.completed ? "TaskBox-Task completed" : "TaskBox-Task"}
      >
        {props.taskName}
      </p>
      <button
        className="TaskBox-ClearTask"
        aria-label="clear"
        onClick={() => props.deleteTask(props.id)}
      >
        <img src={CrossIcon} alt="" />
      </button>
    </div>
  );
}

Task.propTypes = {
  taskName: PropTypes.string,
  id: PropTypes.number,
  deleteTask: PropTypes.func,
  completed: PropTypes.bool,
  completeTask: PropTypes.func,
};

export default Task;
