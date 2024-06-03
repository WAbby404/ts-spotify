import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SelectPlaylist from "./components/SelectPlaylist";
import Logout from "./components/Logout";
import EditGenres from "./components/EditGenres";
import SuccessPopup from "./components/SuccessPopup";
import EditNewPlaylist from "./components/EditNewPlaylist";
import {
  PlaylistData,
  UserData,
  SpotifyParams,
  PopupData,
  ArtistObjectFull,
} from "./components/types";
import { MusicAPI } from "./components/APIWrapper";
import Login from "./components/Login";
import ErrorPopup from "./components/ErrorPopup";
import { ThemeProvider, createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [currentTimeout, setCurrentTimeout] = useState<null | NodeJS.Timeout>(
    null
  );
  const [userData, setUserData] = useState<UserData>({
    name: "",
    img: "",
    id: "",
  });

  const [popupData, setPopupData] = useState<PopupData>({
    popup: false,
    title: "",
    text: "",
  });

  const [playlistData, setPlaylistData] = useState<PlaylistData[]>([
    { title: "", img: "", playlistId: "", totalSongs: 0 },
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistData>({
    title: "",
    img: "",
    playlistId: "",
    totalSongs: 0,
  });

  const [genres, setGenres] = useState<string[]>([]);

  const [newPlaylist, setNewPlaylist] = useState<any[]>([]);

  const [newPlaylistTitle, setNewPlaylistTitle] = useState<string>("");

  const [repeatID, setRepeatID] = useState("");

  const [openSuccess, setOpenSuccess] = useState<boolean>(false);

  const {
    fetchUserData,
    fetchPlaylistData,
    fetchPlaylistTracks,
    fetchArtistDetails,
    createSpotifyPlaylist,
    // addSpotifyPlaylistImage,
    addSpotifyPlaylistTracks,
  } = MusicAPI;

  const handlePopupExit = () => {
    setPopupData({
      popup: false,
      title: "",
      text: "",
    });
    Login();
  };

  useEffect(() => {
    setPopupData({
      popup: false,
      title: "",
      text: "",
    });
    const hash = window.location.hash;
    let token: string | null | undefined = null;

    if (!token && hash) {
      console.log(hash);
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        ?.split("=")[1];
      setToken(token);
      // When this ^ happens, start an hour timer
      // After timer finishes set expired state to true
      window.location.hash = "";

      const hourlyResetToken = async () => {
        const timeoutReference = setTimeout(hourlyResetToken, 3600000);
        setCurrentTimeout(timeoutReference);
        setPopupData({
          popup: true,
          title: "Your access token has expired",
          text: "Login to get a new access token",
        });
      };

      const timeoutReference = setTimeout(hourlyResetToken, 3600000);
      setCurrentTimeout(timeoutReference);

      // Getting User Data from Spotify
      const profileParams: SpotifyParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let profileId = "";

      fetchUserData(profileParams, profileId).then((data) => {
        if (data !== null) {
          setUserData(data);
        }
      });

      // Getting Playlist Data from Spotify
      const playlistParams: SpotifyParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      fetchPlaylistData(playlistParams, profileId).then((dataArray) => {
        if (dataArray != null) {
          setPlaylistData(dataArray);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    // console.log(currentTimeout);
    // set all other states to their default state for no funkiness if they login, mess about, log out and then back in
    setCount(0);
    setToken("");
    setIsLoading(null);

    if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
    }

    setUserData({
      name: "",
      img: "",
      id: "",
    });

    setPopupData({
      popup: false,
      title: "",
      text: "",
    });

    setPlaylistData([{ title: "", img: "", playlistId: "", totalSongs: 0 }]);

    setSelectedPlaylist({
      title: "",
      img: "",
      playlistId: "",
      totalSongs: 0,
    });

    setGenres([]);

    setNewPlaylist([]);

    setNewPlaylistTitle("");

    setRepeatID("");
  };

  const updateCurrentPlaylist = async (
    playlistId: string,
    playlist: PlaylistData
  ) => {
    // updates state to current playlists details
    // and grabs that playlists details for later on
    console.log(playlist);
    setSelectedPlaylist(playlist);
    setGenres([]);
    setNewPlaylist([]);
    setIsLoading(null);
    setNewPlaylistTitle("");
  };

  const generateTitle = () => {
    let title = "";
    title += `${selectedPlaylist.title} but only `;
    if (typeof genres[0] === "string") {
      genres.forEach((genre, index) => {
        if (genres.length === 2) {
          if (index === genres.length - 1) {
            title += `${genre}`;
          } else {
            title += `${genre} & `;
          }
        } else {
          if (index === genres.length - 1) {
            title += `${genre}`;
          } else {
            title += `${genre}, `;
          }
        }
      });
    }
    // console.log(title);
    setNewPlaylistTitle(title);
  };

  const generateNewPlaylist = () => {
    setIsLoading(true);
    generateTitle();
    async function waitForPlaylists() {
      if (repeatID === "" || repeatID !== selectedPlaylist.playlistId) {
        console.log("will run with API calls");
        //
      } else {
        console.log(
          "will run with current artists and songs because this already ran before so its more efficient"
        );
        // run with current artists
      }
      //! if same playlist as last time, use same artists and songs, so no more calls
      // playlist id
      // repeatID state?

      // need to get back an array of songs
      const playlistDetailsParam = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let fullPlaylist = await fetchPlaylistTracks(
        playlistDetailsParam,
        selectedPlaylist.playlistId,
        selectedPlaylist.totalSongs
      );

      // make a set of all artist ids
      let uniqueArtistIDs = new Set();
      if (fullPlaylist !== null) {
        fullPlaylist.forEach((song: any) => {
          song.track.artists.forEach((artist: any) => {
            // each id add it to set
            // artist.track.artists[0].id
            uniqueArtistIDs.add(artist.id);
          });
        });
      }

      let uniqueArtistIDsArray = Array.from(uniqueArtistIDs);

      const artistParams = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let responseArtists = await fetchArtistDetails(
        artistParams,
        uniqueArtistIDsArray
      );

      let artistsWithGenre: any = [];

      responseArtists.forEach((artist: any) => {
        let hasGenre = false;
        genres.forEach((genre) => {
          artist.genres.forEach((genre2: any) => {
            if (genre2.includes(genre)) {
              hasGenre = true;
            }
          });
        });
        if (hasGenre) {
          artistsWithGenre.push(artist.id);
        }

        // if any selected genre is in the 'genres' list, add any song with that id to the newPlaylist
      });
      // now we have a list of artists with our selected genres. NOW we look thru whole playlist,

      let newPlaylistTEMP: any = [];
      if (fullPlaylist !== null) {
        fullPlaylist.forEach((song: any) => {
          if (artistsWithGenre.includes(song.track.artists[0].id)) {
            newPlaylistTEMP.push(song);
          }
        });
      }

      setNewPlaylist(newPlaylistTEMP);
      setRepeatID(selectedPlaylist.playlistId);
      setIsLoading(false);
    }
    waitForPlaylists();
  };

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: green[500],
      },
      secondary: {
        main: "#fff",
      },
    },
  });

  const removeSong = (index: number) => {
    const updatedPlaylist = newPlaylist;
    updatedPlaylist.splice(index, 1);
    setNewPlaylist(updatedPlaylist);
    setCount(count + 1);
  };

  const createNewPlaylist = async () => {
    // create playlist
    const newPlaylistParams = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: `${newPlaylistTitle}`,
        description: "Made in Spotify Genre Playlist Maker",
        public: true,
      }),
    };

    // a playlist without an image breaks the select a playlist thing
    let newPlaylistID: string = "";
    // adds repeat songs, fix this somewhere?
    let newPlaylistData = await createSpotifyPlaylist(
      newPlaylistParams,
      userData.id
    );
    if (newPlaylistData !== null) {
      newPlaylistID = newPlaylistData.id;
    }

    // add an image to playlist
    // const img: string =
    //   "/9j/2wCEABoZGSccJz4lJT5CLy8vQkc9Ozs9R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHCcnMyYzPSYmPUc9Mj1HR0dEREdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//dAAQAAf/uAA5BZG9iZQBkwAAAAAH/wAARCAABAAEDACIAAREBAhEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAYBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwAAARECEQA/AJgAH//Z";

    // const newPlaylistImageParams = {
    //   method: "PUT",
    //   headers: {
    //     Authorization: "Bearer " + token,
    //     "Content-Type": "image/jpeg",
    //   },
    //   body: img,
    // };

    // addSpotifyPlaylistImage(newPlaylistImageParams, newPlaylistID);

    let callAmount = newPlaylist.length;
    let calloffets = [0];
    let currentAmount = 0;
    while (callAmount > 100) {
      callAmount = callAmount - 100;
      currentAmount = currentAmount + 100;
      calloffets.push(currentAmount);
    }

    // need to fill the uris now!, need track uris
    const newPlaylistTrackURIs: any = { uris: [], position: 0 };

    // it said that when position is omitted, songs will be added to the end, so im trying without position

    newPlaylist.forEach((song) => {
      newPlaylistTrackURIs.uris.push("spotify:track:" + song.track.id);
    });
    console.log(newPlaylistTrackURIs);

    // console.log(newPlaylist);
    const newPlaylistSongsParams = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlaylistTrackURIs),
    };

    // need to get over 100 songs working, will need to make multiple songParams
    console.log(newPlaylistSongsParams);

    if (newPlaylistData !== null) {
      addSpotifyPlaylistTracks(newPlaylistSongsParams, newPlaylistData.id);
      // need to put this AFTER to make sure it was successfull
      // Turn openSuccess to true for a timer & turn off after timer is done
      // make sure to clear timer?
      setOpenSuccess(true);
      // timer for 3 seconds
      //
      setTimeout(() => {
        setOpenSuccess(false);
      }, 3000);
    }

    // need to work on positon / call limits
    // might have another promise.all situation

    // add items to playlist (100 song IDS per call)
    // newPlaylist.song(forEach).song.track.id
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="max-w-full h-screen justify-center flex bg-gradient-to-b from-[#1b2e19] to-[#0E1C0D]">
        {token ? (
          <div className="flex flex-col gap-3 w-[96%] p-3 max-h-full grow overflow-y-scroll md:items-center xl:items-stretch xl:grid xl:grid-cols-10 xl:grid-rows-10 xl:gap-4 xl:h-[100vh] xl:p-4">
            <ErrorPopup
              popupData={popupData}
              handlePopupExit={handlePopupExit}
            />
            <SuccessPopup openSuccess={openSuccess} />
            <div className="flex flex-col w-full md:items-center xl:col-span-2 xl:row-span-10 xl:gap-3">
              <SelectPlaylist
                updateCurrentPlaylist={updateCurrentPlaylist}
                playlists={playlistData}
              />
              <div className="hidden xl:block xl:w-full">
                <Logout handleLogout={handleLogout} userData={userData} />
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:items-center xl:col-span-8 xl:row-span-10 xl:order-3 xl:flex xl:flex-col">
              <EditGenres
                newPlaylistTitle={newPlaylistTitle}
                count={count}
                setCount={setCount}
                userData={userData}
                selectedPlaylist={selectedPlaylist}
                newPlaylist={newPlaylist}
                genres={genres}
                setGenres={setGenres}
                removeSong={removeSong}
                generateNewPlaylist={generateNewPlaylist}
                isLoading={isLoading}
              />
              <EditNewPlaylist
                genres={genres}
                userData={userData}
                count={count}
                removeSong={removeSong}
                isLoading={isLoading}
                setCount={setCount}
                newPlaylist={newPlaylist}
                newPlaylistTitle={newPlaylistTitle}
                selectedPlaylist={selectedPlaylist}
                createNewPlaylist={createNewPlaylist}
              />
            </div>
            <div className="xl:hidden w-full md:flex md:items-center md:w-[90%]">
              <Logout handleLogout={handleLogout} userData={userData} />
            </div>
          </div>
        ) : (
          <LoginPage />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
