import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SelectPlaylist from "./components/SelectPlaylist";
import Logout from "./components/Logout";
import EditPlaylist from "./components/EditPlaylist";
import Recommended from "./components/Recommended";
import { Container, Grid } from "@mui/material";
import { PlaylistData, UserData, SpotifyParams } from "./components/types";
import { SpotifyAPI } from "./components/SpotifyWrapper";
import Login from "./components/Login";

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
      // console.log(hash);
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        ?.split("=")[1];
      setToken(token);
      window.location.hash = "";

      // after just before an hour, a new token will be grabbed & another setTimeout will be ran

      // on logout, cancel setTimeout

      // will need to set this to state so we can clear its reference when we log out
      // so

      const hourlyResetToken = async () => {
        // call to refresh token
        // const payload: any = {
        // need to save user id in userData state
        // };

        // const body = await fetch("https://accounts.spotify.com/api/token", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     grant_type: "refresh_token",
        //     refresh_token: token,
        //     client_id: userData.id,
        //   }),
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //     Authorization: "Bearer " + token,
        //   },
        // });
        // application/json; charset=UTF-8
        // const response = await body.json();

        // redirect to log back in

        // const client_id = "c72f57285fb44f519e7fb11dad73ed97";
        // const auth_endpoint = "https://accounts.spotify.com/authorize";
        // const redirect_uri = "http://localhost:3000";

        // return (
        //   <div className="border-solid border-2 border-sky-500">
        //     <Button
        //       href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`

        // console.log(response);

        window.location.href = Login();

        console.log("refresh called");
        console.log("new token grabbed");
        // updates token
        // clears timer, starts a new one (put this in a FN to not duplicate code & replace code below this with that fn)
        const timeoutReference = setTimeout(hourlyResetToken, 3600000);
        setCurrentTimeout(timeoutReference);

        // set token to expired
        // have a setTimeout for after an hour the token is null
      };

      // run this right before a new token is needed
      // change number to a little significantly close to an hour
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
    console.log(currentTimeout);
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
