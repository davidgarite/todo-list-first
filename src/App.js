import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function toggleTodos(id) {
    const newTodos = [...todos]
    const todo = todos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleCompleteTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function checkNoTodos() {
    if (todos.filter(todo => !todo.complete).length === 0) {
      return 'Add A Todo'
    } else {
      return (
        <div>
          {todos.filter(todo => !todo.complete).length} Left Todo
        </div>
      )
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        <TodoList todos={todos} toggleTodos={toggleTodos}/>
      </ul>
      <div className="input-container">
        <input ref={todoNameRef} type="text" />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleCompleteTodo}>Complete Todo(s)</button>
      </div>
      <div className="filter">
        {checkNoTodos()}
      </div>
    </>
  )

}

export default App;
