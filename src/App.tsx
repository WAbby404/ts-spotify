import { useState } from 'react';
import LoginPage from './components/LoginPage';
import SelectPlaylist from './components/SelectPlaylist';
import Logout from './components/Logout';
import EditPlaylist from './components/EditPlaylist';
import Recommended from './components/Recommended';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userData, setUserData ] = useState({});
  // state for users playlists

  return (
    <div className="App">
      {/* { isLoggedIn ? */}
          <div>
            <SelectPlaylist playlists={['cant tell how the info will come in', 'so idk if itll be an array or an obj']}/>
            <Logout username={'Jimmy John'}/>
            <EditPlaylist/>
            <Recommended/>
          </div>
        {/* :  */}
        <LoginPage/>
      {/* } */}
    </div>
  );
}

export default App;
