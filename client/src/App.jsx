import { BrowserRouter, Route, Routes} from "react-router";
import { AuthProvider } from "./context/AuthContext";
/**
 * Import of components
 */
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TasksFormPage from "./pages/TasksFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Nabvar from "./components/Nabvar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Nabvar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />

            <Route element={<ProtectedRoute/>}>
            <Route path="/tasks" element={<TasksPage/>}  />
            <Route path="/add-task" element={<TasksFormPage/>} />
            <Route path="/tasks/:id" element={<TasksFormPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App