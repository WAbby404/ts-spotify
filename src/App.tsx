import { useState } from 'react';
import LoginPage from './components/LoginPage';
import SelectPlaylist from './components/SelectPlaylist';
import Logout from './components/Logout';
import EditPlaylist from './components/EditPlaylist';
import Recommended from './components/Recommended';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  return (
    <div className="App">
      {/* if Logged in, show */}
      { isLoggedIn ?
          <div>
            <SelectPlaylist/>
            <Logout/>
            <EditPlaylist/>
            <Recommended/>

          </div>
        : 
        <LoginPage/>
      }
    </div>
  );
}

export default App;
