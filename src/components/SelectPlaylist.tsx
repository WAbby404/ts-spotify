import { Avatar, Stack, Typography, Button } from "@mui/material";
import { PlaylistData } from "./types";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

type PlaylistProps = {
  updateCurrentPlaylist: (playlistId: string, playlist: PlaylistData) => void;
  playlists: PlaylistData[];
};

// on hover, change background color
function SelectPlaylist(playlistProps: PlaylistProps) {
  const [highlighted, setHighlighted] = useState(-1);

  const playlistBtnTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#B2D1B7",
      },
      secondary: {
        main: "#B2D1B7",
      },
    },
    typography: {
      fontFamily: "Poppins",
      fontWeightRegular: 700,
    },
  });

  return (
    <Stack className="p-2 order-1 gap-2 border-2 border-rose-500">
      <div className="flex gap-2 justify-center items-center ">
        <img
          src={require("../images/playlistIcon.png")}
          alt="Playlist icon"
          className="w-7"
        />
        <h1 className="text-white">Select your playlist</h1>
      </div>

      {playlistProps.playlists.map((playlist, index) => {
        return (
          <div
            className={`flex rounded-md justify-center gap-2 items-center bg-[#A7B6A9] overflow-hidden bg-opacity-25 hover:bg-opacity-50 ${
              highlighted === index ? "bg-opacity-50" : ""
            }`}
            key={index}
            onClick={() => {
              playlistProps.updateCurrentPlaylist(
                playlist.playlistId,
                playlist
              );
              setHighlighted(index);
            }}
          >
            <img
              src={playlist.img}
              alt={`${playlist.title}'s album cover`}
              className="h-[4rem]"
            />
            <h3 className="font-bold text-white grow">{playlist.title}</h3>
          </div>
        );
      })}
    </Stack>
  );
}

export default SelectPlaylist;
