import { Avatar, Stack, Typography } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

type SelectPlaylistProps = {
  playlists: string[];
};

function SelectPlaylist({ playlists }: SelectPlaylistProps) {
  return (
    <Stack className="border-solid border-2 border-sky-500">
      <div className="flex">
        <PlaylistAddIcon />
        <h1>Select your playlist</h1>
      </div>

      {playlists.map((playlist, index) => {
        return (
          // on hover, change background color
          // when selected change background color
          <div key={index}>
            <Avatar />
            <Typography variant="subtitle1">{playlist}</Typography>
          </div>
        );
      })}
    </Stack>
  );
}

export default SelectPlaylist;
