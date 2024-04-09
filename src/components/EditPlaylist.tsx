import { Divider } from "@mui/material";
import PlaylistDetails from "./PlaylistDetails";
import SelectGenres from "./SelectGenres";
import NewPlaylist from "./NewPlaylist";

function EditPlaylist() {
  return (
    <div>
      <PlaylistDetails
        playlistDetails={{ title: "song title 1", img: "img link" }}
      />
      <Divider />
      <SelectGenres genres={["rock", "rap", "jazz"]} />
      <NewPlaylist
        newPlaylistDetails={{
          img: "imgLink",
          title: "some title",
          songs: ["song1", "song2"],
        }}
      />
    </div>
  );
}

export default EditPlaylist;
