import { Divider } from "@mui/material";
import PlaylistDetails from "./PlaylistDetails";
import SelectGenres from "./SelectGenres";
import NewPlaylist from "./NewPlaylist";

function EditPlaylist() {
  return (
    <div>
      <PlaylistDetails
        playlistDetails={{ title: "hi heckeroni", img: "some img link" }}
      />
      <Divider />
      <SelectGenres genres={["swagrock", "swagrap", "swagjazz"]} />
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
