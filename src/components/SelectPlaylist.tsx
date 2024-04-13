import { Avatar, Stack, Typography } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

type PlaylistData = {
  title: string;
  img: string;
  playlistId: string;
};

type PlaylistProps = {
  someFN: () => void;
  playlists: PlaylistData[];
};

// import this rather than duplicating code (if everything goes right)

function SelectPlaylist(playlistProps: PlaylistProps) {
  return (
    <Stack className="border-solid border-2 border-sky-500">
      <div className="flex">
        <PlaylistAddIcon />
        <h1>Select your playlist</h1>
      </div>

      {playlistProps.playlists.map((playlist, index) => {
        return (
          // on hover, change background color
          // when selected change background color

          // onclick to set currentPlaylist to playlists ID
          <div key={index}>
            <Avatar src={playlist.img} />
            <Typography variant="subtitle1">{playlist.title}</Typography>
          </div>
        );
      })}
    </Stack>
  );
}

export default SelectPlaylist;
