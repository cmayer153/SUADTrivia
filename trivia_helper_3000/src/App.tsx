import{ BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import { useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
//import { Grid } from '@mantine/core';
import './App.css'
import { HeaderMenu } from './header/HeaderMenu';
import { HostContainer } from './hosting/HostContainer';
import { AdminContainer } from './admin/AdminContainer';
import MainPage from './pages/hosting/MainPage';

function App() {


  return (
    <Router>
      
      <MantineProvider>
        {
          <div>
            <HeaderMenu />
            <Routes>
              <Route path="/admin" element={<AdminContainer />}/>
              <Route path="/location/:location" element={<HostContainer />}/>
              <Route path="/main" element={<MainPage />}/>
              <Route path="/playlist/:playlistName" element={<HostContainer />}/>
            </Routes>
                
          </div>
        }
      </MantineProvider>
    </Router>

  )
}

export default App