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

  // setGenres

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

    // const playlistDetailsParam = {
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };

    // async function waitForPlaylists() {
    //   let artistIDS = await SpotifyAPI.fetchPlaylistTracks(
    //     playlistDetailsParam,
    //     playlistId
    //   );
    //   console.log("waitForPlaylists call " + artistIDS);
    //   const artistParams = {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   };
    //   if (artistIDS !== null) {
    //     let responseArtists = await SpotifyAPI.fetchArtistDetails(
    //       artistParams,
    //       artistIDS
    //     );
    //     console.log("artist response: " + responseArtists);
    //     console.log(responseArtists);
    //     if (responseArtists !== null) {
    //       let genres = new Set<string>([]);
    //       responseArtists.artists.forEach((artist: ArtistObjectFull) => {
    //         let genreArray = artist.genres;
    //         genreArray.forEach((genre) => {
    //           genres.add(genre);
    //         });
    //       });
    //       console.log(genres);
    //     }
    //   }
    // }
    // waitForPlaylists();
  };

  return (
    <div className="">
      <Container>
        {token ? (
          <Grid>
            <ErrorPopup
              popupData={popupData}
              handlePopupExit={handlePopupExit}
            />
            <SelectPlaylist
              updateCurrentPlaylist={updateCurrentPlaylist}
              playlists={playlistData}
            />
            <Logout handleLogout={handleLogout} userData={userData} />
            <EditPlaylist
              userData={userData}
              selectedPlaylist={selectedPlaylist}
            />
            <Recommended
              recommendedSongs={["rock jazz song1", "smooth jazz 2"]}
            />
          </Grid>
        ) : (
          <LoginPage />
        )}
      </Container>
    </div>
  );
}

export default App;
