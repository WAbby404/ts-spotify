import { Divider } from "@mui/material";
import PlaylistDetails from "./PlaylistDetails";
import SelectGenres from "./SelectGenres";
import NewPlaylist from "./NewPlaylist";
import { PlaylistData, UserData } from "./types";

type EditPlaylistProps = {
  currentPlaylist: PlaylistData;
  userData: UserData;
};

function EditPlaylist(props: EditPlaylistProps) {
  return (
    <div>
      <PlaylistDetails
        userData={props.userData}
        currentPlaylist={props.currentPlaylist}
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
