import { Avatar, Stack, Typography, Button } from "@mui/material";
import { PlaylistData } from "./types";
import { useState } from "react";

type PlaylistProps = {
  updateCurrentPlaylist: (playlistId: string, playlist: PlaylistData) => void;
  playlists: PlaylistData[];
};

// on hover, change background color
function SelectPlaylist(playlistProps: PlaylistProps) {
  const [highlighted, setHighlighted] = useState(-1);

  return (
    <Stack className="bg-gray-800 p-2 grow order-1">
      <div className="flex gap-2 justify-center items-center">
        <img
          src={require("../images/playlistIcon.png")}
          alt="Playlist icon"
          className="w-7"
        />
        <h1 className="text-white">Select your playlist</h1>
      </div>

      {playlistProps.playlists.map((playlist, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              playlistProps.updateCurrentPlaylist(
                playlist.playlistId,
                playlist
              );
              setHighlighted(index);
            }}
            variant={highlighted === index ? "contained" : "outlined"}
          >
            <Avatar src={playlist.img} variant="square" />
            <Typography variant="subtitle1" className="grow">
              {playlist.title}
            </Typography>
          </Button>
        );
      })}
    </Stack>
  );
}

export default SelectPlaylist;
