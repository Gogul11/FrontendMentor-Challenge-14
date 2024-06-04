import React, { useEffect, useState } from "react"
import Addtask from "./components/add"
import { mobdark, deskdark, moblight, desklight,sun, moon} from "./image"
function App() {

  const [bg, setbg] = useState(window.innerWidth >= 380 ? deskdark : mobdark)
  const [theme, settheme] =useState(false)

  const changetheme = () => {
      settheme(!theme)
  }
  const updateBg = () => {
    setbg(window.innerWidth >= 380 ? (theme ? desklight : deskdark) : (theme ? moblight : mobdark))
  }
  useEffect(()=>{
    if(theme){
      document.body.classList.add("light")
    }
    else{
      document.body.classList.remove("light")
    }
    updateBg();
    window.addEventListener('resize', updateBg)
        return () => {
          window.removeEventListener('resize', updateBg)
  }})

  return(
    <div>
      <img src={bg} alt="bg" className="bg"/>
          <div className="first">
                    <div className="heading">
                        <p className="head">T O D O</p>
                        <p className="button"><img src={theme ? moon : sun} alt="but" onClick={changetheme}/></p>
                    </div>
                    <div className="todo">
                        <Addtask theme={theme}/>
                    </div>
          </div>
    </div>
  )
  
}

export default App