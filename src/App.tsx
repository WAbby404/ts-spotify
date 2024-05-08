import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SelectPlaylist from "./components/SelectPlaylist";
import Logout from "./components/Logout";
import EditPlaylist from "./components/EditPlaylist";
import Recommended from "./components/Recommended";
import { Container, Grid } from "@mui/material";
import {
  PlaylistData,
  UserData,
  SpotifyParams,
  PopupData,
  ArtistObjectFull,
} from "./components/types";
import { MusicAPI } from "./components/APIWrapper";
import { useMusicAPI } from "./components/APIWrapper2";
import Login from "./components/Login";
import ErrorPopup from "./components/ErrorPopup";

// NEED AN ISLOADING STATE
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
        setUserData(data);
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
  };

  const generateNewPlaylist = () => {
    setIsLoading(true);
    // need to turn a loading state ON here
    // console.log("making a new playlist brrring brrrring,, bing bing brrring");
    // get songs, get artists - if artist has a genre that inside our genre list, add song to new

    async function waitForPlaylists() {
      if (repeatID === "" || repeatID !== selectedPlaylist.playlistId) {
        console.log("will run without API calls now, so itll be much faster");
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
      console.log("fullPlaylist: ");
      console.log(fullPlaylist);
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
      console.log("uniqueArtistIDs: ");
      console.log(uniqueArtistIDs);

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

      console.log("responseArtists: ");
      console.log(responseArtists);

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
      console.log("artistsWithGenres: ");
      console.log(artistsWithGenre);
      // now we have a list of artists with our selected genres. NOW we look thru whole playlist,
      // if a fullPlaylist.song.track.id is not in artistsWithGenres

      // fullPlaylist.artist.track.artists[0].id
      // 0fYPQBOx0vsRMmjUba9HgF
      // 0fYPQBOx0vsRMmjUba9HgF
      // responseArtists.artist.id

      let newPlaylistTEMP: any = [];
      fullPlaylist.forEach((song: any) => {
        if (artistsWithGenre.includes(song.track.artists[0].id)) {
          newPlaylistTEMP.push(song);
        }
      });
      console.log("newPlaylistTEMP: ");
      console.log(newPlaylistTEMP);

      setNewPlaylist(newPlaylistTEMP);
      setIsLoading(false);
    }
    waitForPlaylists();
  };

  return (
    <div className="w-screen h-screen border-2 border-rose-500">
      {token ? (
        <div className="flex">
          <ErrorPopup popupData={popupData} handlePopupExit={handlePopupExit} />
          <div className="border-2 border-gray-700">
            <SelectPlaylist
              updateCurrentPlaylist={updateCurrentPlaylist}
              playlists={playlistData}
            />
            <Logout handleLogout={handleLogout} userData={userData} />
          </div>
          <div className="border-4 border-indigo-500">
            <EditPlaylist
              count={count}
              setCount={setCount}
              userData={userData}
              selectedPlaylist={selectedPlaylist}
              newPlaylist={newPlaylist}
              genres={genres}
              setGenres={setGenres}
              generateNewPlaylist={generateNewPlaylist}
              isLoading={isLoading}
            />
            <Recommended
              recommendedSongs={["rock jazz song1", "smooth jazz 2"]}
            />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
