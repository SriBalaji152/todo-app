import { useState } from "react";
import Header from "./component/Header";
import './index.css'

function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [displayAdd, setDisplayAdd] = useState(false);
  const [todosList, setTodosList] = useState([{
    id: 1,
    name: "Learn React",
    completed: false,
  }]);
  const [addInput, setAddInput] = useState("")


  const handleInputChange = (e) => {
    const val = e?.target?.value;
    setSearch(val)
  }

  const handleAddInput = (e) => {
    setAddInput(e.target.value)
  }

  const addTodoList = () => {
    console.log('entered addTodoList')
    setTodosList([{
      id: (Math.random() * 1000) + todosList.length,
      name: addInput,
      completed: false,
    }, ...todosList])
    setAddInput("")
    toggleAddBtn()
  }

  const removeItem = (id) => {
    const newList = todosList.filter(item => item.id !== id)
    setTodosList(newList)
  }

  const handleComplete = (id) => {
    const newList = todosList.map(item => {
      if (item.id === id) {
        return ({ ...item, completed: !item.completed })
      } else {
        return item
      }
    })
    setTodosList(newList)
  }

  const updateFilter = (val) => {
    setFilter(val);
  }

  const toggleAddBtn = () => {
    setDisplayAdd(!displayAdd);
  }

  return (
    <div className="App">
      <Header />
      {
        displayAdd &&
        <div className="add-item">
          <input name="add" type="text" placeholder="Add Item" value={addInput} onChange={handleAddInput} />
          <i onClick={() => addTodoList()} class="material-icons add-icon">check</i>
        </div>
      }



      {!displayAdd &&
        < div className="todo-items">
          <input name="search" type="text" placeholder="Search" value={search} onChange={handleInputChange} />

          {todosList?.filter(item => {
            if (filter === 'Remaining') { return item.completed === false }
            else if (filter === 'Completed') { return item.completed === true }
            return item
          }).filter(item => {
            if (search) {
              return item.name.toLowerCase().includes(search.toLowerCase())
            }
            return item
          }).map(item => {
            return (
              <div key={item.id}>
                <input name="todoStatus" value={item.completed} onChange={() => handleComplete(item.id)} type="checkbox" />
                <span className={item.completed ? "completed" : "pending"} >{item.name}</span>
                <i class="material-icons delete-icon" onClick={() => removeItem(item.id)}>delete</i>
              </div>
            )
          })}
        </div>
      }

      <footer className="headerAndFooter">
        {displayAdd && <i onClick={toggleAddBtn} class="material-icons">close</i>}
        {!displayAdd && <i onClick={toggleAddBtn} class="material-icons">add</i>}
        <div className="filters" >
          <button className="allButton" onClick={() => updateFilter("All")}>All</button>
          <button className="completedButton" onClick={() => updateFilter("Completed")}>Completed</button>
          <button className="remainingButton" onClick={() => updateFilter("Remaining")}>Remaining</button>
        </div>
      </footer>
    </div >
  );
}

export default App;
