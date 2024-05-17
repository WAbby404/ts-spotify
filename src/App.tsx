import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SelectPlaylist from "./components/SelectPlaylist";
import Logout from "./components/Logout";
import EditPlaylist from "./components/EditPlaylist";
import Recommended from "./components/Recommended";
import NewPlaylist from "./components/NewPlaylist";
import {
  PlaylistData,
  UserData,
  SpotifyParams,
  PopupData,
  ArtistObjectFull,
} from "./components/types";
import { MusicAPI } from "./components/APIWrapper";
// import { useMusicAPI } from "./components/APIWrapper2";
import Login from "./components/Login";
import ErrorPopup from "./components/ErrorPopup";
import { ThemeProvider, createTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";

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

  const {
    fetchUserData,
    fetchPlaylistData,
    fetchPlaylistTracks,
    fetchArtistDetails,
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
      // On API calls, check if res
      window.location.hash = "";

      // 3600000

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

      // HERE API calls
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
    setToken("");
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
    }
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
    console.log(title);
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
      // console.log("fullPlaylist: ");
      // console.log(fullPlaylist);
      // keep all songs in a state

      // make a set of all artist ids
      let uniqueArtistIDs = new Set();
      fullPlaylist.forEach((song: any) => {
        song.track.artists.forEach((artist: any) => {
          // each id add it to set
          // artist.track.artists[0].id
          uniqueArtistIDs.add(artist.id);
        });
      });
      // console.log("uniqueArtistIDs: ");
      // console.log(uniqueArtistIDs);

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

      // console.log("responseArtists: ");
      // console.log(responseArtists);

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
      // console.log("artistsWithGenres: ");
      // console.log(artistsWithGenre);
      // now we have a list of artists with our selected genres. NOW we look thru whole playlist,

      let newPlaylistTEMP: any = [];
      fullPlaylist.forEach((song: any) => {
        if (artistsWithGenre.includes(song.track.artists[0].id)) {
          newPlaylistTEMP.push(song);
        }
      });
      // console.log("newPlaylistTEMP: ");
      // console.log(newPlaylistTEMP);

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

  const playlistBtnTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: green[500],
      },
      secondary: {
        main: "#B2D1B7",
      },
    },
  });

  const removeSong = (index: number) => {
    const updatedPlaylist = newPlaylist;
    updatedPlaylist.splice(index, 1);
    setNewPlaylist(updatedPlaylist);
    setCount(count + 1);
  };

  const createPlaylist = () => {};

  return (
    <ThemeProvider theme={theme}>
      <div className="max-w-full h-screen justify-center flex bg-gradient-to-b from-[#1b2e19] to-[#0E1C0D]">
        {token ? (
          <div className="flex flex-col gap-3 w-[96%] p-3 max-h-full grow overflow-y-scroll md:items-center">
            <ErrorPopup
              popupData={popupData}
              handlePopupExit={handlePopupExit}
            />
            <SelectPlaylist
              updateCurrentPlaylist={updateCurrentPlaylist}
              playlists={playlistData}
            />
            {/* <div className="flex gap-2 flex-col justify-between">
            <SelectPlaylist
              updateCurrentPlaylist={updateCurrentPlaylist}
              playlists={playlistData}
            />
            <Logout handleLogout={handleLogout} userData={userData} />
          </div> */}
            <EditPlaylist
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
            <NewPlaylist
              genres={genres}
              userData={userData}
              count={count}
              removeSong={removeSong}
              isLoading={isLoading}
              setCount={setCount}
              newPlaylist={newPlaylist}
              newPlaylistTitle={newPlaylistTitle}
              selectedPlaylist={selectedPlaylist}
            />
            <Recommended
              recommendedSongs={["rock jazz song1", "smooth jazz 2"]}
            />
            <Logout handleLogout={handleLogout} userData={userData} />
          </div>
        ) : (
          <LoginPage />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
