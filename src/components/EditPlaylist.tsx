import { Divider, Skeleton } from "@mui/material";
import PlaylistDetails from "./PlaylistDetails";
import SelectGenres from "./SelectGenres";
import NewPlaylist from "./NewPlaylist";
import { PlaylistData, UserData } from "./types";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type EditPlaylistProps = {
  selectedPlaylist: PlaylistData;
  userData: UserData;
  genres: string[];
  count: number;
  newPlaylist: any[];
  isLoading: boolean | null;
  newPlaylistTitle: string;
  setCount: React.Dispatch<React.SetStateAction<any>>;
  setGenres: React.Dispatch<React.SetStateAction<any>>;
  generateNewPlaylist: () => void;
};

function EditPlaylist(props: EditPlaylistProps) {
  const [closed, setClosed] = useState<boolean>(false);

  return (
    <div className="order-2">
      <div
        className="flex gap-2 justify-center items-center"
        onClick={() => setClosed(!closed)}
      >
        <img
          src={require("../images/playlistGenresIcon.png")}
          alt="Playlist icon"
          className="w-7"
        />
        <h1 className="text-white">Pick your Genres</h1>
        <button className={`md:hidden text-white font-bold`}>
          {closed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </button>
      </div>
      {props.selectedPlaylist.title ? (
        <div className="flex flex-col gap-2">
          <PlaylistDetails
            closed={closed}
            userData={props.userData}
            currentPlaylist={props.selectedPlaylist}
          />
          <Divider />
          <SelectGenres
            closed={closed}
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
            isLoading={props.isLoading}
            setCount={props.setCount}
            newPlaylist={props.newPlaylist}
            newPlaylistTitle={props.newPlaylistTitle}
            newPlaylistDetails={{
              img: "imgLink",
              title: "some title",
              songs: ["song1"],
            }}
            selectedPlaylist={props.selectedPlaylist}
          />
        </div>
      ) : (
        <div className={`flex gap-2 ${closed === true ? "" : "hidden"}`}>
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
