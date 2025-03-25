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
          <input className="taskRadioInput" type="radio" value="veryHigh" id="veryHigh" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="veryHigh">Very High</label>
          <input className="taskRadioInput" type="radio" value="high" id="high" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="high">High</label>
          <input className="taskRadioInput" type="radio" value="medium" id="medium" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="medium">Medium</label>
          <input className="taskRadioInput" type="radio" value="low" id="low" name="priority" onChange={this.priorityChange}/>
          <label className="taskRadioText" for="low">Low</label>
          <input className="taskRadioInput" type="radio" value="veryLow" id="veryLow" name="priority" onChange={this.priorityChange}/>
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
        <button className="submitTask" onClick={() => {
          this.props.closeWindow();
        }}>Create Task</button>
      </div>
    )
  }
}

export default CreateTask;