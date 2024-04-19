import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SelectPlaylist from "./components/SelectPlaylist";
import Logout from "./components/Logout";
import EditPlaylist from "./components/EditPlaylist";
import Recommended from "./components/Recommended";
import { Container, Grid } from "@mui/material";
import { PlaylistData, UserData, SpotifyParams } from "./components/types";
import { SpotifyAPI } from "./components/SpotifyWrapper";

function App() {
  const [token, setToken] = useState<string | undefined>("");
  const [userData, setUserData] = useState<UserData>({
    name: "",
    img: "",
  });

  // originally has to come from here tho. lets fix that first
  // need to share all info like picture, title, time etc.
  const [playlistData, setPlaylistData] = useState<PlaylistData[]>([
    { title: "", img: "", playlistId: "", totalSongs: 0 },
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistData>({
    title: "",
    img: "",
    playlistId: "",
    totalSongs: 0,
  });
  // need to make this an obj, with all the values to update current playlist for editPlaylist
  // need to share all info like picture, title, time etc.
  const [artistIds, setArtistIds] = useState<string>("");

  useEffect(() => {
    const hash = window.location.hash;
    let token: string | null | undefined = null;

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        ?.split("=")[1];
      setToken(token);
      window.location.hash = "";

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

  const updateCurrentPlaylist = (
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
        console.log(data);
        // need artist IDs from here
        setArtistIds(data);
      }
    );

    const artistParams = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    // SpotifyAPI.fetchArtistDetails(artistParams, artistIds).then((data) => {
    //   console.log(data);
    // });

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
            <SelectPlaylist
              updateCurrentPlaylist={updateCurrentPlaylist}
              playlists={playlistData}
            />
            <Logout setToken={setToken} userData={userData} />
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
