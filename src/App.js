import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from "uuid"

const LOCAL_STORAGE_KEY = 'TodayDoList.App'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos)
    {
      setTodos( prevTodos => [...prevTodos, ...storedTodos] );
    } 
  },[])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) 

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return null;
    setTodos(prevTodos=> {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  
  function handleClearAllTodos(){
    const newTodos = todos.filter(todo => !todo.complete && todo.complete)
    setTodos(newTodos)
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div className='w-full h-screen bg-[#121212] text-white flex flex-col justify-center'>
          <div className='w-full mx-auto flex flex-col max-w-[400px] h-400px
          md:max-w-[800px] md:h-[600px] 
          '>
            <div className='text-center pt-3 pb-7'>
              <h1 className='border-[#df4a58] animate-[pulse_3.5s_ease-in-out_infinite] font-bold text-4xl inline border-b-4
              md:text-6xl md:border-b-8'>TODAY-DO LIST!</h1> 
            </div>
            <div className='flex flex-col pt-5'>
              <div className='justify-center flex h-12
              md:h-14'>
                <div className='w-3/5 pr-2'>
                  <input ref={todoNameRef} type="text" className='w-full text-white h-full text-left
                  bg-black bg-opacity-50 pl-4 rounded-3xl hover:bg-opacity-100 text-base
                  md:text-xl' placeholder='Enter Your Task . . .'/>
                </div>
                <div>
                <button className='h-full bg-[#df4a58] px-4 rounded-full hover:bg-white hover:text-[#df4a58]' onClick={handleAddTodo}>+ New Task</button>
                </div>
              </div>
              <div className='my-auto mx-auto pt-6'>
                  <p className='text-base'>YOU HAVE  {todos.filter(todo => !todo.complete).length} UNCOMPLETED TASK </p>
                </div>
              <div className='max-h-60 pt-5 flex flex-col items-center overflow-y-scroll scrollbar-hide'>
                <TodoList todos = {todos} toggleTodo = {toggleTodo} />
              </div>
              <div className='h-24 mx-auto flex'>

                <div className='my-auto mx-2'>
                  <button className='h-full bg-[#df4a58] px-5 rounded-3xl py-3 hover:bg-white hover:text-[#df4a58]' onClick={handleClearTodos}>Clear Task</button>
                </div>
                <div className='my-auto mx-2'>
                  <button className='h-full bg-[#df4a58] px-5 rounded-3xl py-3 hover:bg-white hover:text-[#df4a58]' onClick={handleClearAllTodos}>Clear All</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  )
} 

export default App;
