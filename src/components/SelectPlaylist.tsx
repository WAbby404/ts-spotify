import { Avatar, Stack, Typography, Button } from "@mui/material";
import { PlaylistData } from "./types";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type PlaylistProps = {
  updateCurrentPlaylist: (playlistId: string, playlist: PlaylistData) => void;
  playlists: PlaylistData[];
};

// on hover, change background color
function SelectPlaylist(playlistProps: PlaylistProps) {
  const [highlighted, setHighlighted] = useState(-1);
  const [closed, setClosed] = useState(false);

  return (
    <div className="p-2 flex flex-col gap-2 bg-[#0B1A0B]/75 rounded-sm md:w-[90%]">
      <div
        className="flex gap-2 justify-center items-center"
        onClick={() => setClosed(!closed)}
      >
        <img
          src={require("../images/playlistIcon.png")}
          alt="Playlist icon"
          className="w-7"
        />
        <h1 className="text-white">Select your playlist</h1>
        <button className={`xl:hidden text-white font-bold`}>
          {closed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
      </div>

      {playlistProps.playlists.map((playlist, index) => {
        return (
          <div
            className={`flex rounded-md justify-center gap-2 items-center bg-[#A7B6A9] overflow-hidden bg-opacity-25 hover:bg-opacity-50
            ${closed && index !== highlighted ? "hidden" : ""} ${
              highlighted === index ? "bg-opacity-50" : ""
            } md:m-4`}
            key={index}
            onClick={() => {
              if (!closed) {
                playlistProps.updateCurrentPlaylist(
                  playlist.playlistId,
                  playlist
                );
                setClosed(true);
                setHighlighted(index);
              }
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
    </div>
  );
}

export default SelectPlaylist;
