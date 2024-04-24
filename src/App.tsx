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
} from "./components/types";
import { SpotifyAPI } from "./components/SpotifyWrapper";
import Login from "./components/Login";
import ErrorPopup from "./components/ErrorPopup";

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

  const [artistIds, setArtistIds] = useState<string>("");

  const handlePopupExit = () => {
    setPopupData({
      popup: false,
      title: "",
      text: "",
    });
    window.location.href = Login();
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
      // console.log(hash);
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        ?.split("=")[1];
      setToken(token);
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
    setSelectedPlaylist(playlist);

    const playlistDetailsParam = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    SpotifyAPI.fetchPlaylistTracks(playlistDetailsParam, playlistId).then(
      (data) => {
        console.log("data in first fetch:" + data);
        // need artist IDs from here
        // setArtistIds(data);
        SpotifyAPI.fetchArtistDetails(artistParams, data)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.log(error));
      }
    );

    const artistParams = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    // SpotifyAPI.fetchArtistDetails(artistParams, artistIds)
    //   .then((data) => {
    //     console.log(data);
    //     console.log(artistIds);
    //   })
    //   .catch((error) => console.log(error));

    // fetch(
    //   `https://api.spotify.com/v1/artists?${artistIdsCorrectStructure}`,
    //   artistParams
    // )
    //   .then((result) => {
    //     if (!result.ok) {
    //       console.log(result);
    //       throw new Error("Network response was not ok");
    //     }
    //     return result.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });

    // a fetch call to to recieve data on artists based on
    // have to get artsists too
    // https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
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
