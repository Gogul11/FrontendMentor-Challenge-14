import React, {useState, useEffect} from "react";
import styles from "./add.module.css"
import {cross} from "../image";

function Addtask({theme}){

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [count, setcount] = useState(0)
    const [show, set] = useState(1)


    const handleKeydown = (e)=>{
        if(e.key == "Enter"){
            if(task.trim() !== "")
            {
                setTasks([...tasks, {text : task, completed : false}])
                setTask(" ")
                e.target.value = " "
                setcount(count + 1)
            }
        }
    }

    const handleDelete =(index) => (e) => {
        e.target.classList.toggle(`${theme ? styles.strikeLight : styles.strike}`)
        if(e.target.classList.contains(`${theme ? styles.strikeLight : styles.strike}`)){
            setcount(count - 1)
            tasks[index].completed = true
        }
        else{
            setcount(count + 1)
            tasks[index].completed = false
            
        }
    }

        const clearCompleted = () => {
            const final = tasks.filter(task => !task.completed)
            setTasks(final)
        }


    const allComponent = (theme) =>( <ul id="list-bar" className={theme? styles.lightNameLight : styles.listName}>{
                                tasks.map((task, index) => (
                                    <li key = {index} id="task" className={styles.liItem}  >
                                    <span onClick={handleDelete(index)} className={task.completed ? (theme ? styles.strikeLight : styles.strike ):styles.content}>{task.text} </span>
                                    <img src={cross} alt="cross-symbol"  className={styles.cross}/>
                                    </li>
                                ))}
                        </ul> )

    const activeComponent = (theme) => (<ul id="list-bar" className={theme?styles.lightNameLight : styles.listName}>{
                                    tasks.map((task, index) => !task.completed ?
                                        <li key = {index} id="task" className={styles.liItem}>
                                        <span className={styles.content}> {task.text} </span>
                                        </li> : []
                                    )
                                }
                            </ul>)

    const completedComponent = (theme) => (<ul id="list-bar" className={theme?styles.lightNameLight : styles.listName}>{
                                tasks.map((task, index) => task.completed ?
                                    <li key = {index} id="task" className={styles.liItem}>
                                    <span className={styles.content}> {task.text} </span>
                                    </li> : []
                                )
                                }
                            </ul>)


    return(
        <div id="main" className={styles.main}>

                <div >
                    <input  type="text" className={theme?styles.addBarLight:styles.addBar} id="addbar" placeholder="Create a new todo..." 
                            onChange={(e) => setTask(e.target.value)}
                            onKeyDown={handleKeydown}/>
                </div>

                <div>
                
                    {show === 1 && <>{allComponent(theme)}</>}
                    {show === 2 && <>{activeComponent(theme)}</>}
                    {show === 3 && <>{completedComponent(theme)}</>}

        
                    <div className={theme?styles.desLight:styles.des} id="des">
                        <span className={styles.span1}>{count} items left</span>
                        <span className={styles.compBtn} onClick={clearCompleted}>Clear Completed</span>
                    </div>

                </div>

                <div id="detail" className={theme?styles.detailLight:styles.detail}>

                        <span id="all" onClick={() => set(1)}>All</span>
                        <span id="active" onClick={() => set(2)}>Active</span>
                        <span id="completed" onClick={() =>set(3)}>Completed</span>

                </div>

        </div>    
    )
}

export default Addtask;