import React, { useState } from 'react';

function AddTask({ onAddTask }) {
  // State: primitives and objects for form data
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [errors, setErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Title required and minimum 3 characters
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Lift state up - call parent function
      onAddTask(title, priority);
      
      // Clear form after successful submission
      setTitle('');
      setPriority('medium');
      setErrors({});
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md shadow-emerald-400 mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
          {/* Validation error message */}
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Priority Select */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded font-semibold"
        >
          ADD TASK
        </button>
      </form>
    </div>
  );
}

export default AddTask;