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

function App() {
  const [token, setToken] = useState<string | undefined>("");
  const [userData, setUserData] = useState<UserData>({
    name: "",
    img: "",
  });

  useEffect(() => {
    const hash = window.location.hash;
    let token: string | string[] | null | undefined = null;

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
      // console.log(token);
      fetch("https://api.spotify.com/v1/me", profileParams)
        .then((result) => result.json())
        .then((data) => {
          // console.log(data);
          const userObj = {
            name: data.display_name,
            img: data.images[0].url,
          };
          setUserData(userObj);
        });
      // need a catch here
    }
  }, []);

  function LogoutAccount() {
    setToken("");
  }

  return (
    <div className="">
      <Container>
        {token ? (
          <Grid>
            <SelectPlaylist playlists={["info", "more info here"]} />
            <Logout LogoutAccount={LogoutAccount} userData={userData} />
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
