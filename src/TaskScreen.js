import logo from './images/Jumpstart_logo.png';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './TaskScreen.css'

class TaskScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      todayOpen: true,
      laterOpen: false,
    }
  }

  render() {
    const {todayOpen, laterOpen} = this.state;
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
          }}>Log Off</button>
        </div>
        <div className="body">
          <div className="taskScreenHeader">
            <h1 className="greeting">Welcome back!</h1>
          </div>
          <div className="bodyLine taskScreenLine"/>
          <div className="taskScreenContent">
            <button className="createTask">Create Task</button>
            <br/>
            <button className="openClose" onClick={() => {
              this.setState({todayOpen: !todayOpen});
            }}>{(todayOpen) ? "▾" : "▸"} Tasks for Today</button>
            <br/>
            {(todayOpen) && <div className="tasksToday">
              <div className="task">
                <p className="taskInfo">
                  Task: Make Dinner<br/>
                  Priority: Medium<br/>
                  Notes: Making a nice and healthy dinner is crucial for ensuring a productive evening!
                </p>
                <button className="taskButton markComplete">Mark as Complete</button>
                <button className="taskButton editTask">Edit Task</button>
              </div>
            </div>}
            <button className="openClose" onClick={() => {
              this.setState({laterOpen: !laterOpen});
            }}>{(laterOpen) ? "▾" : "▸"} Tasks for Later</button>
          </div>
        </div>
      </div>
    )
  }
}

export default () => {
  const navigate = useNavigate();
  return (<TaskScreen navigate={navigate}/>);
}