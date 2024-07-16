import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tasks.css';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('in process');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = { name, priority, description, status, dateCreated: new Date().toISOString() };
    try {
      await axios.post('http://localhost:5000/api/tasks', newTask);
      fetchTasks();
      setName('');
      setPriority('');
      setDescription('');
      setStatus('in process');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete('http://localhost:5000/api/tasks');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting all tasks:', error);
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getClassNameForPriority = (task) => {
    if (task.status === 'done') {
      return 'done';
    } else if (task.priority === 'High') {
      return 'blink-red';
    } else if (task.priority === 'Low') {
      return 'blink-blue';
    }else if (task.priority === 'Medium'){
      return 'blink-orange';
    }
    return '';
  };

  return (
    <div className="tasks-container">
      <form onSubmit={handleAddTask}>
        <div>
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Task</button>
      </form>

      <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Priority</th>
            <th>Date Created</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className={getClassNameForPriority(task)}>
              <td>{task.name}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.dateCreated).toLocaleString()}</td>
              <td>{task.description}</td>
              <td>
                <select
                id="taskstatus"
                  value={task.status}
                  onChange={(e) => handleChangeStatus(task._id, e.target.value)}
                >
                  <option id="taskstatus" value="in process">In Process</option>
                  <option id="taskstatus" value="done">Done</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
