import {useEffect, useState} from "react"
const TodoApp = ()=> {
const [input, setInput ] = useState("")
const [todos, setTodos] = useState(()=>
{
const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
}
)
const [edit, setEdit ] = useState(null)

useEffect (()=> {
  
  localStorage.setItem("todos", JSON.stringify(todos));

  
}, [todos])

const handleChange = (e)=> {

  setInput(e.target.value)
}

const handleAdd =()=> {

  if(input.trim() === "") return 
  if(edit !== null){

    let edittodo = todos.map((todo)=> todo.id === edit ? {...todo, text:input} : todo)
    setTodos(edittodo)
    setInput("")
    setEdit(null)
  } else{
  const newTodo = {
    id: Date.now(),
    text: input,
    complete: false
  }
setTodos([...todos, newTodo])
setInput("")
  }


  
}

const handleEdit = (todo)=> {
  setInput(todo.text)
  setEdit(todo.id)
   

}

const handleDelete=(id)=> {
  let update = todos.filter((todo)=> todo.id !== id )

  setTodos(update)
}
const handleCancel = ()=> {
  setInput("")
  setEdit(null)
}

const handleDone = (id)=> {
  let status = todos.map((todo)=>  todo.id === id ? {...todo, complete: !todo.complete} : todo)
  setTodos(status)
}

const handlekeyPress =(e)=> {
 
  if(e.key === "Enter"){
    handleAdd()
  }
}
  return (
    <>
<div className="container">
  <h1>Todo</h1>
  <input type="text"  placeholder="What needs to be done?" value={input} onChange={handleChange} onKeyDown={handlekeyPress}/>
  <button onClick={handleAdd}>Add</button>
  <button onClick={handleCancel} disabled={edit == null }>  Cancel</button>

</div>

<ul>
  {todos.map((todo)=> 
    <li>
<div>
  <span key={todo.id} style={{textDecoration : todo.complete ? "line-through" : "none"}} > {todo.text}</span>
   {" "} <button onClick={()=> handleEdit(todo)} > edit</button>
   <button onClick={()=> handleDelete(todo.id)}>Delete</button>
   <button onClick={()=> handleDone(todo.id)}>Done</button>
</div>
    </li>


  )}
</ul>

    </>
  )

}
export default TodoApp