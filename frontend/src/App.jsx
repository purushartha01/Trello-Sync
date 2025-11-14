import TasksBoard from "./components/TasksBoard";
import useSocket from "./hooks/useSocket";

function App() {

  useSocket("server:cardUpdated", (data) => {
    console.log("Card updated event received:", data);
  });

  return (
    <>
      <TasksBoard />
    </>
  )
}

export default App;