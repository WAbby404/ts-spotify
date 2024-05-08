import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SelectPlaylist from "./components/SelectPlaylist";
import Logout from "./components/Logout";
import EditPlaylist from "./components/EditPlaylist";
import Recommended from "./components/Recommended";
import { Container, Grid } from "@mui/material";
import {
  PlaylistData,
  UserData,
  SpotifyParams,
  PopupData,
  ArtistObjectFull,
} from "./components/types";
import { MusicAPI } from "./components/APIWrapper";
import { useMusicAPI } from "./components/APIWrapper2";
import Login from "./components/Login";
import ErrorPopup from "./components/ErrorPopup";

// NEED AN ISLOADING STATE
function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState<string | undefined>("");
  const [currentTimeout, setCurrentTimeout] = useState<null | NodeJS.Timeout>(
    null
  );
  const [userData, setUserData] = useState<UserData>({
    name: "",
    img: "",
    id: "",
  });

  const [popupData, setPopupData] = useState<PopupData>({
    popup: false,
    title: "",
    text: "",
  });

  const [playlistData, setPlaylistData] = useState<PlaylistData[]>([
    { title: "", img: "", playlistId: "", totalSongs: 0 },
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistData>({
    title: "",
    img: "",
    playlistId: "",
    totalSongs: 0,
  });

  const [genres, setGenres] = useState<string[]>([]);

  const [newPlaylist, setNewPlaylist] = useState<string[]>([]);

  const {
    fetchUserData,
    fetchPlaylistData,
    fetchPlaylistTracks,
    fetchArtistDetails,
  } = MusicAPI;

  const handlePopupExit = () => {
    setPopupData({
      popup: false,
      title: "",
      text: "",
    });
    Login();
  };

  useEffect(() => {
    setPopupData({
      popup: false,
      title: "",
      text: "",
    });
    const hash = window.location.hash;
    let token: string | null | undefined = null;

    if (!token && hash) {
      console.log(hash);
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        ?.split("=")[1];
      setToken(token);
      // When this ^ happens, start an hour timer
      // After timer finishes set expired state to true
      // On API calls, check if res
      window.location.hash = "";

      // 3600000

      const hourlyResetToken = async () => {
        const timeoutReference = setTimeout(hourlyResetToken, 3600000);
        setCurrentTimeout(timeoutReference);
        setPopupData({
          popup: true,
          title: "Your access token has expired",
          text: "Login to get a new access token",
        });
      };

      const timeoutReference = setTimeout(hourlyResetToken, 3600000);
      setCurrentTimeout(timeoutReference);

      // Getting User Data from Spotify
      const profileParams: SpotifyParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let profileId = "";

      // HERE API calls
      fetchUserData(profileParams, profileId).then((data) => {
        setUserData(data);
      });

      // Getting Playlist Data from Spotify
      const playlistParams: SpotifyParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      fetchPlaylistData(playlistParams, profileId).then((dataArray) => {
        if (dataArray != null) {
          setPlaylistData(dataArray);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    // console.log(currentTimeout);
    setToken("");
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
    }
  };

  const updateCurrentPlaylist = async (
    playlistId: string,
    playlist: PlaylistData
  ) => {
    // updates state to current playlists details
    // and grabs that playlists details for later on
    console.log(playlist);
    setSelectedPlaylist(playlist);
    setGenres([]);
    setNewPlaylist([]);
  };

  const generateNewPlaylist = () => {
    // need to turn a loading state ON here
    // console.log("making a new playlist brrring brrrring,, bing bing brrring");
    // get songs, get artists - if artist has a genre that inside our genre list, add song to new
    setNewPlaylist(["Grenade - Bruno Mars", "Tabo Bell Bell Sound Gong"]);
    async function waitForPlaylists() {
      // need to get back an array of songs
      const playlistDetailsParam = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let fullPlaylist = await fetchPlaylistTracks(
        playlistDetailsParam,
        selectedPlaylist.playlistId,
        selectedPlaylist.totalSongs
      );
      console.log("fullPlaylist: ");
      console.log(fullPlaylist);
      // keep all songs in a state

      // make a set of all artist ids
      let uniqueArtistIDs = new Set();
      fullPlaylist.forEach((song: any) => {
        song.track.artists.forEach((artist: any) => {
          // each id add it to set
          uniqueArtistIDs.add(artist.id);
        });
      });
      console.log("uniqueArtistIDs: ");
      console.log(uniqueArtistIDs);

      let uniqueArtistIDsArray = Array.from(uniqueArtistIDs);

      const artistParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let responseArtists = await fetchArtistDetails(
        artistParams,
        uniqueArtistIDsArray
      );
    }
    waitForPlaylists();
    // we do all the calculations to make the new playlist & now we set it to newplaylist state
  };

  return (
    <div className="w-screen h-screen border-2 border-rose-500">
      {token ? (
        <div className="flex">
          <ErrorPopup popupData={popupData} handlePopupExit={handlePopupExit} />
          <div className="border-2 border-gray-700">
            <SelectPlaylist
              updateCurrentPlaylist={updateCurrentPlaylist}
              playlists={playlistData}
            />
            <Logout handleLogout={handleLogout} userData={userData} />
          </div>
          <div className="border-4 border-indigo-500">
            <EditPlaylist
              count={count}
              setCount={setCount}
              userData={userData}
              selectedPlaylist={selectedPlaylist}
              newPlaylist={newPlaylist}
              genres={genres}
              setGenres={setGenres}
              generateNewPlaylist={generateNewPlaylist}
            />
            <Recommended
              recommendedSongs={["rock jazz song1", "smooth jazz 2"]}
            />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
