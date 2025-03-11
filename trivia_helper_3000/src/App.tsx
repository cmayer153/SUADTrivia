import{ BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import { useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
//import { Grid } from '@mantine/core';
import './App.css'
import { HeaderMenu } from './HeaderMenu';
import { HostContainer } from './hosting/HostContainer';
import { AdminContainer } from './admin/AdminContainer';

function App() {


  return (
    <Router>
      <MantineProvider>
        {
          <div>
            <Routes>
              <Route path="/" element={<HeaderMenu />}/>
              <Route path="/admin" element={<AdminContainer />}/>
              <Route path="/location/:location" element={<HostContainer />}/>
            </Routes>
                
          </div>
        }
      </MantineProvider>
    </Router>

  )
}

export default App