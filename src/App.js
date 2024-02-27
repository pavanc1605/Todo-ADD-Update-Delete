
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, deleteTodo } from './Redux/actions';
import './Todo.css';

const TodoApp = ({ todos, addTodo, updateTodo, deleteTodo }) => {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      addTodo({
        id: Date.now(),
        text: text,
        completed: false,
      });
      setText('');
    }
  };

  const handleUpdateTodo = (id, newText) => {
    updateTodo({
      id: id,
      newText: newText,
    });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo({
      id: id,
    });
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          !todo.completed && (
            <li key={todo.id} className="todo-item">
              {todo.text}
              <button className="update-btn" onClick={() => handleUpdateTodo(todo.id, prompt('Update Todo', todo.text))}>
                Update
              </button>
              <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
  updateTodo: (todo) => dispatch(updateTodo(todo)),
  deleteTodo: (todo) => dispatch(deleteTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
