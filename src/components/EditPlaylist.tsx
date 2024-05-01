import { Divider, Skeleton } from "@mui/material";
import PlaylistDetails from "./PlaylistDetails";
import SelectGenres from "./SelectGenres";
import NewPlaylist from "./NewPlaylist";
import { PlaylistData, UserData } from "./types";

type EditPlaylistProps = {
  selectedPlaylist: PlaylistData;
  userData: UserData;
  genres: string[];
  count: number;
  newPlaylist: string[];
  setCount: React.Dispatch<React.SetStateAction<any>>;
  setGenres: React.Dispatch<React.SetStateAction<any>>;
  generateNewPlaylist: () => void;
};

function EditPlaylist(props: EditPlaylistProps) {
  return (
    <div>
      {props.selectedPlaylist.title ? (
        <div>
          <PlaylistDetails
            userData={props.userData}
            currentPlaylist={props.selectedPlaylist}
          />
          <Divider />
          <SelectGenres
            genres={props.genres}
            setGenres={props.setGenres}
            count={props.count}
            setCount={props.setCount}
            generateNewPlaylist={props.generateNewPlaylist}
          />
          <Divider />
          <NewPlaylist
            genres={props.genres}
            count={props.count}
            setCount={props.setCount}
            newPlaylist={props.newPlaylist}
            newPlaylistDetails={{
              img: "imgLink",
              title: "some title",
              songs: ["song1"],
            }}
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={210} height={118} />
          <div className="flex flex-col">
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={210} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={210} />
            <div className="flex gap-2">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={210} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPlaylist;
