import { Button, Skeleton } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CloseIcon from "@mui/icons-material/Close";
import { PlaylistData, UserData } from "./types";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type NewPlaylistProps = {
  selectedPlaylist: PlaylistData;
  removeSong: (index: number) => void;
  createNewPlaylist: () => void;
  genres: string[];
  count: number;
  newPlaylist: any[];
  userData: UserData;
  isLoading: boolean | null;
  newPlaylistTitle: string;
  setCount: React.Dispatch<React.SetStateAction<any>>;
};

function EditPlaylist(props: NewPlaylistProps) {
  const [closed, setClosed] = useState(false);

  const convertFromMs = (millis: any) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  };

  const render = () => {
    switch (props.isLoading) {
      case true:
        return (
          <div className="bg-[#0B1A0B]/75 rounded-sm md:w-[90%] xl:w-full xl:h-full">
            <div
              className="flex gap-2 justify-center items-center "
              onClick={() => setClosed(!closed)}
            >
              <img
                src={require("../images/editPlaylistIcon.png")}
                alt="Playlist icon"
                className="w-7"
              />
              <h1 className="text-white">Edit your new playlist</h1>
              <button className={`lg:hidden text-white font-bold`}>
                {closed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div>

            <div className={`text-center m-auto ${closed ? "hidden" : ""}`}>
              <h2 className="text-lime-50 p-3">Generating your new playlist</h2>
              <div className="flex">
                <Skeleton variant="rectangular" width={210} height={60} />
                <div className="flex flex-col w-[100%]">
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>
              </div>
            </div>
          </div>
        );

      case false:
        return (
          <div className="text-white bg-[#0B1A0B]/75 rounded-sm p-2 flex flex-col gap-2 md:w-[90%] xl:w-full xl:h-full xl:grow">
            <div className="xl:h-64 xl:w-full">
              <div
                className="flex gap-2 justify-center items-center"
                onClick={() => setClosed(!closed)}
              >
                <img
                  src={require("../images/editPlaylistIcon.png")}
                  alt="Playlist icon"
                  className="w-7"
                />
                <h1 className="text-white">Edit your new playlist</h1>
                <button className={`xl:hidden text-white font-bold`}>
                  {closed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
              </div>
              <div className="w-[90%] m-auto pt-1 flex flex-col gap-2 items-center justify-center xl:flex-row xl:justify-between">
                <div className="flex flex-col gap-2 xl:flex-row">
                  <img
                    src={props.selectedPlaylist.img}
                    alt="Old playlists art"
                    className="w-[5rem]"
                  />
                  <div className="flex flex-col items-center justify-center xl:items-start ">
                    <h2>{props.newPlaylistTitle}</h2>
                    <div className="flex gap-1.5 items-center">
                      <p className="italic font-thin">
                        {props.newPlaylist.length} songs
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="contained"
                  onClick={() => props.createNewPlaylist()}
                >
                  Add Playlist to Spotify
                </Button>
              </div>
              <div className="flex flex-col gap-3 md:p-5">
                <div
                  className={`flex justify-between ${
                    closed && window.innerWidth < 1280 ? "hidden" : ""
                  }`}
                >
                  <div className="hidden xl:block">
                    <TagIcon />
                  </div>

                  <h3 className="hidden xl:block">TITLE</h3>
                  <h3 className="hidden xl:block">ALBUM</h3>
                  <div className="hidden xl:block">
                    <AccessTimeFilledIcon />
                  </div>
                </div>
                <ul
                  className={`flex flex-col gap-2 xl:overflow-y-scroll 2xl:h-[19rem] xl:h-[12rem] ${
                    closed && window.innerWidth < 1280 ? "hidden" : ""
                  }`}
                >
                  {props.newPlaylist.length > 0 ? (
                    props.newPlaylist.map((song, index) => {
                      return (
                        <li
                          key={index}
                          className="flex justify-between xl:items-start xl:gap-4"
                        >
                          <h3 className="hidden xl:inline text-[#C7C7C7]">
                            {index + 1}
                          </h3>
                          <div className="flex gap-2 justify-center items-center">
                            <img
                              src={song.track.album.images[2].url}
                              alt={`${song.track.album.artists[0].name} album cover`}
                            />
                            <div className="">
                              <h4>{song.track.name}</h4>
                              <h4 className="font-thin text-[#C7C7C7]">
                                {song.track.album.artists[0].name}
                              </h4>
                            </div>
                          </div>

                          <h4 className="hidden xl:inline xl:grow text-[#C7C7C7]">
                            {song.track.album.name}
                          </h4>
                          <h4>
                            <a
                              className="text-[#C7C7C7] flex gap items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`${song.track.external_urls.spotify}`}
                            >
                              <img
                                src={require("../images/Spotify_White.png")}
                                alt="Spotify logo"
                                className="w-[10px] h-[10px]"
                              />
                              Play on Spotify
                            </a>
                          </h4>

                          <h4 className="hidden xl:inline text-[#C7C7C7]">
                            {convertFromMs(song.track.duration_ms)}
                          </h4>
                          <button
                            className="hover:text-red-500"
                            onClick={() => props.removeSong(index)}
                          >
                            <CloseIcon />
                          </button>
                        </li>
                      );
                    })
                  ) : (
                    <li>No songs found</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-[#0B1A0B]/75 rounded-sm p-2 md:w-[90%] xl:w-full xl:h-full">
            <div
              className="flex gap-2 justify-center items-center "
              onClick={() => setClosed(!closed)}
            >
              <img
                src={require("../images/editPlaylistIcon.png")}
                alt="Playlist icon"
                className="w-7"
              />
              <h1 className="text-white">Edit your new playlist</h1>
              <button className={`xl:hidden text-white font-bold`}>
                {closed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="md:w-[100%] md:flex md:justify-center xl:w-full xl:max-h-full xl:grow">
      {render()}
    </div>
  );
}

export default EditPlaylist;
