import Button from "@mui/material/Button";
import Login from "./Login";

function LoginPage() {
  return (
    <div className="w-9/12 m-auto flex flex-col text-center gap-2 xl:w-96">
      <img
        src={require("../images/tsSpotifyLogo.png")}
        alt="tsSpotify logo"
        className="w-1/3 m-auto"
      />
      <h1 className="text-white font-extrabold">Playlists and Genres</h1>
      <p className="text-white font-light xl:pb-5">
        a playlist generator - powered by Spotify
      </p>
      <Button onClick={() => Login()} variant="contained">
        Login
      </Button>
    </div>
  );
}

export default LoginPage;
