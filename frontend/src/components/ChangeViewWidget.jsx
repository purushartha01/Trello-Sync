import { useEffect, useRef, useState } from "react";
import { ChangeView, GridIcon, ListIcon } from "../utility/Icons";


const ChangeViewWidget = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const menuRef = useRef();
  const iconRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && iconRef.current && !iconRef.current.contains(event.target)) {
        setIsMenuVisible(false);
        return;
      }
    }

    if (isMenuVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

  }, [isMenuVisible]);

  return (
    <div className="relative">
      <span
        onClick={
          () => {
            setIsMenuVisible((prev) => !prev);
          }
        }
        ref={iconRef}
        title="Change View"
      >

        <ChangeView className="h-9 aspect-square outline-none cursor-pointer"
        />
      </span>

      <div
        className={`${isMenuVisible ? 'flex' : 'hidden'} flex-col absolute top-[calc(100%+4px)] right-0 bg-white text-gray-800 w-[120px] max-h-[20dvh] border rounded-sm py-2 z-50`}
        ref={menuRef}
      >
        <span className="flex flex-row" onClick={() => { console.log("Grid View clicked"); setIsMenuVisible(false); }}>
          <GridIcon />
          <span>Grid View</span>
        </span>
        <span className="flex flex-row">
          <ListIcon />
          <span>List View</span>
        </span>
      </div>
    </div>
  )
}

export default ChangeViewWidget