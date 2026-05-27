import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  // Calculate counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Task Statistics */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Task Statistics</h2>
        <div className="flex gap-6">
          <p className="text-gray-700">
            <span className="font-semibold">Total Tasks:</span> {totalTasks}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Completed:</span> {completedTasks}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Pending:</span> {totalTasks - completedTasks}
          </p>
        </div>
      </div>

      {/* Task List */}
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks yet. Add one above!</p>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
