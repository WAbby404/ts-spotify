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

  // need to make this an obj, with all the values to update current playlist for editPlaylist
  // need to share all info like picture, title, time etc.
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistData>({
    title: "",
    img: "",
    playlistId: "",
    totalSongs: 0,
  });

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

      // maybe do a popup for an error

      // Promise.all([
      //   fetch("https://api.spotify.com/v1/me", profileParams),
      //   fetch(
      //     "https://api.spotify.com/v1/users/22luq27bmpzmb3x3fdk6ze6sq/playlists",
      //     playlistParams
      //   ),
      // ])
      //   .then((links) => {
      //     const response1 = links[0];
      //     const response2 = links[1];
      //     console.log(response1);
      //     console.log(response2);
      //     console.log(response1.json());
      //     console.log(response2.json());
      //     if (!response1.ok || !response2.ok) {
      //       throw new Error("Network response was not ok");
      //     }
      //     return;
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   });
    }
  }, []);

  const updateCurrentPlaylist = (playlistId: string) => {
    let artistIdsCorrectStructure: string = "ids=";

    // need to move below to a getGenres fn

    const playlistDetailsParam = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      playlistDetailsParam
    )
      .then((result) => {
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then((data) => {
        // console.log(data);
        const artistIds = new Set<string>([]);
        data.items.forEach((song: any) => {
          // console.log(song);
          if (song.track.artists.length === 1 && artistIds.size < 100) {
            // unless if artistIds = 100
            artistIds.add(song.track.artists[0].id);
          } else if (artistIds.size < 100) {
            song.track.artists.forEach((artist: any) => {
              artistIds.add(artist.id);
            });
          }
        });
        // get an array of artist ids (for genres in playlist)
        console.log(artistIds.size);
        artistIds.forEach((value) => {
          artistIdsCorrectStructure += `${value},`;
        });

        console.log(artistIdsCorrectStructure);

        // make multiple artist call to spotify
      })
      .catch((error) => console.log(error));

    const artistParams = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    fetch(
      `https://api.spotify.com/v1/artists?${artistIdsCorrectStructure}`,
      artistParams
    )
      .then((result) => {
        if (!result.ok) {
          console.log(result);
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then((data) => {
        console.log(data);
      });

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
              currentPlaylist={currentPlaylist}
              userData={userData}
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
