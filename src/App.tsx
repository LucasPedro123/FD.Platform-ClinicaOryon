import AppRouter from './Routes/index'
import { Sidebar } from './Components/Sidebar/Sidebar.component';
import { useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';


function App() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      {location.pathname !== '/' ? <Sidebar /> : ''}
      <AppRouter />
      <ToastContainer />
    </div>
  )
}

export default App
