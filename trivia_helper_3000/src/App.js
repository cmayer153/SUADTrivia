//
import React from 'react';
import './App.css';
import ReactPlayer from 'react-player/file';


function App() {

 
  return (
    <div style={{display: 'flex'}} className="App">
      <header className="App-header">
      </header>
      <div style={{ flex: 1 }}>Play History</div>
      <div style={{ flex: 1 }}>
        <ReactPlayer
          url={"https://trivia.sfo3.cdn.digitaloceanspaces.com/13%20-%20Tupelo%20Honey.mp3"}
          controls={true}
          config={{
            file: {
              forceAudio: true
            }
          }}
        />
      </div>
      <div style={{ flex: 1 }}>Play List</div>
    </div>
  );
}

export default App;