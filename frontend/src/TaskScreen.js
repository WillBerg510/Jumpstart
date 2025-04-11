import logo from './images/Jumpstart_logo.png';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './TaskScreen.css'
import CreateTask from './CreateTask';

class TaskScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      todayOpen: true,
      laterOpen: false,
      createTaskOpen: false,
      tasks: [],
    }
  }

  getHabits = () => {
    fetch("http://localhost:5000/habits/", { // Make call to backend for getting habits
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      this.setState({tasks: data.habits});
    }).catch(error => {
      alert(error);
    });
  }

  componentDidMount() {
    this.getHabits();
  }

  closeWindow = () => {
    this.setState({createTaskOpen: false});
    this.getHabits();
  }

  render() {
    const {todayOpen, laterOpen, createTaskOpen, tasks} = this.state;

    const taskDivs = tasks.map((task) => 
      <div className="task">
        <p className="taskInfo">
          Task: {task.name}<br/>
          Priority: {task.priority}<br/>
          Description: {task.description}
        </p>
        <button className="taskButton markComplete">Mark as Complete</button>
        <button className="taskButton editTask">Edit Task</button>
      </div>
    )

    return (
      <div className="taskScreen">
        <div className="sidebar">
          <div className="logoBox">
            <img src={logo} height={70} className="logo"/>
          </div>
          <div className="sidebarLine taskScreenLine"/>
          <button className="sidebarButton">Tasks</button>
          <button className="sidebarButton">Settings</button>
          <button className="sidebarButton">Help</button>
          <div className="sidebarEmptySpace"/>
          <button className="sidebarButton logOffButton" onClick={() => {
            this.props.navigate("/");
            sessionStorage.removeItem("auth_token");
          }}>Log Off</button>
        </div>
        <div className="body">
          <div className="taskScreenHeader">
            <h1 className="greeting">Welcome back!</h1>
          </div>
          <div className="bodyLine taskScreenLine"/>
          <div className="taskScreenContent">
            <button className="createTask" onClick={() => {
              this.setState({createTaskOpen: true})
            }}>Create Task</button>
            <br/>
            <button className="openClose" onClick={() => {
              this.setState({todayOpen: !todayOpen});
            }}>{(todayOpen) ? "▾" : "▸"} Tasks for Today</button>
            <br/>
            {(todayOpen) && <div className="tasksToday">
              <ul>{taskDivs}</ul>
            </div>}
            <button className="openClose" onClick={() => {
              this.setState({laterOpen: !laterOpen});
            }}>{(laterOpen) ? "▾" : "▸"} Tasks for Later</button>
          </div>
        </div>
        {createTaskOpen && <CreateTask closeWindow={this.closeWindow}/>}
        {createTaskOpen && <div className="focus"/>}
      </div>
    )
  }
}

export default () => {
  const navigate = useNavigate();
  return (<TaskScreen navigate={navigate}/>);
}