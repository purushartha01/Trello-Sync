import { useState } from "react";
import { AddTaskCard } from "../utility/Icons"


const AddTaskWidget = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleDropdownToggle = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
      return
    }
    setIsMenuVisible(true);
  }

  return (
    <div>
      <AddTaskCard className="" onClick={handleDropdownToggle}/>
      <div className={`${isMenuVisible ? 'flex' : 'hidden'}`}>

      </div>
    </div>

  )
}

export default AddTaskWidget