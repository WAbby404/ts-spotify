import { Avatar, Stack, Typography, Button } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { PlaylistData } from "./types";
import { useState } from "react";

type PlaylistProps = {
  updateCurrentPlaylist: (playlistId: string) => void;
  playlists: PlaylistData[];
};

// on hover, change background color
// when selected change background color

// onclick to set currentPlaylist to playlists ID
function SelectPlaylist(playlistProps: PlaylistProps) {
  const [highlighted, setHighlighted] = useState(-1);

  return (
    <Stack className="border-solid border-2 border-sky-500">
      <div className="flex">
        <PlaylistAddIcon />
        <h1>Select your playlist</h1>
      </div>

      {playlistProps.playlists.map((playlist, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              // maybe all this data has to come from playlistProps, playlist?
              // console.log(playlist);
              playlistProps.updateCurrentPlaylist(playlist.playlistId);
              setHighlighted(index);
            }}
            variant={highlighted === index ? "contained" : "outlined"}
            // color={highlighted === index ? "secondary" : "primary"}
          >
            <Avatar src={playlist.img} />
            <Typography variant="subtitle1">{playlist.title}</Typography>
          </Button>
        );
      })}
    </Stack>
  );
}

export default SelectPlaylist;
