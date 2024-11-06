import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import EditTodo from "./components/EditTodo/EditTodo";
import { useSelector } from "react-redux";

function App() {
  const { editForm } = useSelector((state) => state.todo);

  return (
    <main>
      <Toaster />
      <NavBar />
      <Home />
      {editForm.status && <EditTodo />}
    </main>
  );
}

export default App;
