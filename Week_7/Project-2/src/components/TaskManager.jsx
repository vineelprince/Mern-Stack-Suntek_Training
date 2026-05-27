import React, { useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';

function TaskManager() {
  // State: array of task objects
  const [tasks, setTasks] = useState([]);

  // Add a new task - lifted state function passed to child
  const addTask = (title, priority) => {
    const newTask = {
      id: Date.now(), // Simple unique ID
      title: title,
      priority: priority,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle task completion status
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 bg-amber-300 p-3"> Task Manager</h1>
      
      {/* Child: Form for adding tasks */}
      <AddTask onAddTask={addTask} />
      
      {/* Child: List of tasks */}
      <TaskList 
        tasks={tasks} 
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default TaskManager;
