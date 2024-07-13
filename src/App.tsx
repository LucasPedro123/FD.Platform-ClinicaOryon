import AppRouter from './Routes/index'
import { Sidebar } from './Components/Sidebar/Sidebar.component';
import { useLocation } from 'react-router';


function App() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      {location.pathname !== '/' ? <Sidebar /> : ''}
      <AppRouter />
    </div>
  )
}

export default App
