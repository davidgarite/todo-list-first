import React from 'react'
import Todo from './Todo'
import './TodoList.css'


export default function TodoList({ todos, toggleTodos }) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodos={toggleTodos} todo={todo} />
        })
    )
}
