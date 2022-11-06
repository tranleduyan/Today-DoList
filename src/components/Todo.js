import React from 'react'

function Todo({todo, toggleTodo}) {
    function handledTodoChecked(){
        toggleTodo(todo.id)
    }
    return (
        <div className='h-12 my-2  bg-black bg-opacity-50 rounded-3xl flex justify-between hover:bg-opacity-100 w-3/6
        md:pl-4 md:w-1/4'>
            
            <div className='truncate w-3/4 flex flex-col justify-center'>
                <p className='pl-4'>{todo.name}</p>
            </div>
            <div className='flex flex-col justify-center pr-3'>
                <input className='pr-4' type="checkbox" checked={todo.complete} onChange={handledTodoChecked} />
            </div>
            
        </div>

  )
}

export default Todo