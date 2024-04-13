import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SelectPlaylist from "./components/SelectPlaylist";
import Logout from "./components/Logout";
import EditPlaylist from "./components/EditPlaylist";
import Recommended from "./components/Recommended";
import { Container, Grid } from "@mui/material";

type UserData = {
  name: string;
  img: string;
};

type PlaylistData = {
  title: string;
  img: string;
  playlistId: string;
};
// import this rather than duplicating code (if everything goes right)

type SpotifyPlaylistData = {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: [{ height: null; url: string; width: null }];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: { href: string; total: number };
  type: string;
  uri: string;
};

function App() {
  const [token, setToken] = useState<string | undefined>("");
  const [userData, setUserData] = useState<UserData>({
    name: "",
    img: "",
  });
  const [playlistData, setPlaylistData] = useState<PlaylistData[]>([
    { title: "", img: "", playlistId: "" },
  ]);

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

      const profileParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const playlistParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      // console.log(token);
      let profileId = "";
      fetch("https://api.spotify.com/v1/me", profileParams)
        .then((result) => {
          if (!result.ok) {
            // change this into an error popup?
            throw new Error("Network response was not ok");
          }
          return result.json();
        })
        .then((data) => {
          const userObj = {
            name: data.display_name,
            img: data.images[0].url,
          };
          profileId = data.id;

          setUserData(userObj);
        })
        .catch((error) => console.log(error));
      // need an error popup?
      fetch(
        `https://api.spotify.com/v1/users/${profileId}/playlists`,
        playlistParams
      )
        .then((result) => {
          if (!result.ok) {
            // change this into an error popup?
            throw new Error("Network response was not ok");
          }
          return result.json();
        })
        .then((data) => {
          // console.log(data);
          // console.log("Data.items: ");
          // console.log(data.items);
          const dataArray: PlaylistData[] = data.items.map(
            (playlist: SpotifyPlaylistData) => {
              return {
                title: playlist.name,
                img: playlist.images[0].url,
                playlistId: playlist.id,
              };
            }
          );
          console.log("DataArray: ");
          console.log(dataArray);
          setPlaylistData(dataArray);
        })
        .catch((error) => console.log(error));

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

  return (
    <div className="">
      <Container>
        {token ? (
          <Grid>
            <SelectPlaylist
              someFN={() => console.log("yippy")}
              playlists={playlistData}
            />
            <Logout setToken={setToken} userData={userData} />
            <EditPlaylist />
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
