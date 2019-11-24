import React from 'react'

export default function Todo({ todo, toggleTodos }) {

    function handleClickTodo() {
        toggleTodos(todo.id)
    }

    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleClickTodo} />
                <span class="checkmark"></span>
                {todo.name}
            </label>
        </li>
    )
}
