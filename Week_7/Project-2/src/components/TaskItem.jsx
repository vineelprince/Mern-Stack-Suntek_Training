import React from 'react';

function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  // Priority color mapping
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className={`border rounded-lg p-4 flex items-center justify-between ${
      task.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
    }`}>
      <div className="flex items-center gap-4 flex-1">
        {/* Task Details */}
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
          
          {/* Priority Badge */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
            priorityColors[task.priority]
          }`}>
            {task.priority.toUpperCase()} PRIORITY
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Toggle Complete Button */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`px-4 py-2 rounded font-semibold ${
            task.completed 
              ? 'bg-yellow-500 text-white' 
              : 'bg-green-500 text-white'
          }`}
        >
          {task.completed ? ' Undo' : 'Complete'}
        </button>
        
        {/* Delete Button */}
        <button
          onClick={() => onDeleteTask(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded font-semibold">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
