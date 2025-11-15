import TasksBoard from "./components/TasksBoard";
import { DataProvider } from "./context/DataContext";
import useSocket from "./hooks/useSocket";

function App() {

  return (
    <DataProvider>
      <TasksBoard />
    </DataProvider>
  )
}

export default App;