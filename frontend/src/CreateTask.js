import React from 'react';
import './CreateTask.css'

class CreateTask extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        name: {
          value: "",
          error: null,
        },
        priority: {
          value: "",
          error: null,
        },
        description: {
          value: "",
          error: null,
        },
        repeats: {
          value: "",
          error: null,
        },
      },
    }
  }

  priorityChange = (e) => {
    const {fields} = this.state;
    this.setState({fields: {
      ...fields, priority: {...fields.priority, value: e.target.value}
    }});
  }

  repeatsChange = (e) => {
    const {fields} = this.state;
    this.setState({fields: {
      ...fields, repeats: {...fields.repeats, value: e.target.value}
    }});
  } 

  submitTask = () => {
    const {fields} = this.state;
    console.log(fields.name.value);
    console.log(fields.priority.value);
    console.log(fields.description.value);
    console.log([fields.repeats.value]);
    fetch("http://localhost:5000/habits", { // Make call to backend for task creation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({
        name: fields.name.value,
        priority: fields.priority.value,
        description: fields.description.value,
        repeats: [fields.repeats.value],
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      return response.json();
    }).catch(error => {
      alert(error);
    });
    this.props.closeWindow();
  }

  render() {
    const {fields} = this.state;
    return (
      <div className="createTaskWindow">
        <h1 className="createTaskTitle">Create Task</h1>
        <div className="taskInputBox">
          <h3 className="taskInputText">Task Name:</h3>
          <input className="taskInput" type="text" name="name" placeholder="Read a book" onChange={(e) => {
            this.setState({fields: {
              ...fields, name: {...fields.name, value: e.target.value}
            }});
          }}/>
          <p className="error taskError">{fields.name.error}</p>
        </div>
        <div className="taskInputBox">
          <h3 className="taskInputText">Priority:</h3>
          <input className="taskRadioInput" type="radio" value="Very High" id="veryHigh" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="veryHigh">Very High</label>
          <input className="taskRadioInput" type="radio" value="High" id="high" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="high">High</label>
          <input className="taskRadioInput" type="radio" value="Medium" id="medium" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="medium">Medium</label>
          <input className="taskRadioInput" type="radio" value="Low" id="low" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="low">Low</label>
          <input className="taskRadioInput" type="radio" value="Very Low" id="veryLow" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="veryLow">Very Low</label>
          <p className="error taskError">{fields.priority.error}</p>
        </div>
        <div className="taskInputBox">
          <h3 className="taskInputText">Description:</h3>
          <textarea className="taskInput descriptionInput" type="text" name="description" onChange={(e) => {
            this.setState({fields: {
              ...fields, description: {...fields.description, value: e.target.value}
            }});
          }}/>
          <p className="error taskError">{fields.description.error}</p>
        </div>
        <div className="taskInputBox">
          <h3 className="taskInputText">Repeats:</h3>
          <input className="taskRadioInput" type="radio" value="daily" id="daily" name="repeats" onChange={this.repeatsChange}/>
          <label className="taskRadioText" for="daily">Daily</label>
          <input className="taskRadioInput" type="radio" value="weekly" id="weekly" name="repeats" onChange={this.repeatsChange}/>
          <label className="taskRadioText" for="weekly">Weekly</label>
          <input className="taskRadioInput" type="radio" value="monthly" id="monthly" name="repeats" onChange={this.repeatsChange}/>
          <label className="taskRadioText" for="monthly">Monthly</label>
          <input className="taskRadioInput" type="radio" value="annually" id="annually" name="repeats" onChange={this.repeatsChange}/>
          <label className="taskRadioText" for="annually">Annually</label>
          <p className="error taskError">{fields.repeats.error}</p>
        </div>
        <button className="submitTask" onClick={this.submitTask}>Create Task</button>
      </div>
    )
  }
}

export default CreateTask;