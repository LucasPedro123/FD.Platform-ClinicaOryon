import AppRouter from './Routes/index'
import { Sidebar } from './Components/Sidebar/Sidebar.component';


function App() {

  return (
    <div style={{display: 'flex'}}>
      <Sidebar />
      <AppRouter />
    </div>
  )
}

export default App
