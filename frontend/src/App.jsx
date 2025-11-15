import TasksBoard from "./components/TasksBoard";
import { DataProvider } from "./context/DataContext";
import useSocket from "./hooks/useSocket";
import { Toaster } from "sonner";


function App() {

  return (
    <DataProvider>
      <Toaster />
      <TasksBoard />
    </DataProvider >
  )
}

export default App;