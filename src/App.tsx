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
import { SpotifyAPI } from "./components/SpotifyWrapper";
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

      SpotifyAPI.fetchUserData(profileParams, profileId).then((data) => {
        // console.log(data);
        setUserData(data);
      });

      // Getting Playlist Data from Spotify
      const playlistParams: SpotifyParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      SpotifyAPI.fetchPlaylistData(playlistParams, profileId).then(
        (dataArray) => {
          if (dataArray != null) {
            setPlaylistData(dataArray);
          }
        }
      );
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
    console.log("making a new playlist brrring brrrring,, bing bing brrring");
    // get songs, get artists - if artist has a genre that inside our genre list, add song to new
    setNewPlaylist(["Grenade - Bruno Mars", "Tabo Bell Bell Sound Gong"]);
    async function waitForPlaylists() {
      console.log(playlistData);
      const playlistDetailsParam = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let artistIDS = await SpotifyAPI.fetchPlaylistTracks(
        playlistDetailsParam,
        selectedPlaylist.playlistId
      );
      console.log("waitForPlaylists call " + artistIDS);
      const artistParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      if (artistIDS !== null) {
        let responseArtists = await SpotifyAPI.fetchArtistDetails(
          artistParams,
          artistIDS
        );
        console.log("artist response: " + responseArtists);
        console.log(responseArtists);

        // const getSongWithSelectedGenres = () => {
        //   let artistsWithGenres = [];
        //   if (responseArtists !== null) {
        //     responseArtists.artists.forEach((artist) =>
        //       genres.forEach((genre) => {
        //         if (artist.genres.includes(genre)) {
        //           artistsWithGenres.push(artist);
        //         }
        //       })
        //     );
        //   }
        // };
        // getArtistsWithSelectedGenres();
      }
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
