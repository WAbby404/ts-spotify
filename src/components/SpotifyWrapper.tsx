import {
  SpotifyParams,
  UserData,
  UserObjectPublic,
  PlaylistData,
  ListOfUsersPlaylistsResponse,
} from "./types";

export const SpotifyAPI = {
  fetchUserData: async function (
    profileParams: SpotifyParams,
    profileId: string
  ): Promise<UserData> {
    let userObj: UserData = {
      name: "",
      img: "",
    };
    await fetch("https://api.spotify.com/v1/me", profileParams)
      .then((result) => {
        if (!result.ok) {
          // error popup?
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then((data: UserObjectPublic) => {
        if (data.display_name && data.images) {
          userObj = {
            name: data.display_name,
            img: data.images[0].url,
          };
        }
        //else give them a temporary name & image?
        profileId = data.id;
        console.log(userObj);
        return userObj;
      })
      .catch((error) => {
        // error popup?
        console.log(error);
      });
    return userObj;
  },

  fetchPlaylistData: async function (
    playlistParams: SpotifyParams,
    profileId: string
  ): Promise<PlaylistData[] | null> {
    let dataArray: PlaylistData[] = [];
    await fetch(
      `https://api.spotify.com/v1/users/${profileId}/playlists`,
      playlistParams
    )
      .then((result) => {
        if (!result.ok) {
          // error popup?
          console.log("bad network response" + result.ok);
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then((data: ListOfUsersPlaylistsResponse) => {
        dataArray = data.items.map((playlist: any) => {
          return {
            title: playlist.name,
            img: playlist.images[0].url,
            playlistId: playlist.id,
            totalSongs: playlist.tracks.total,
          };
        });
      })
      .catch((error) => {
        // error popup?
        console.log(error);
      });
    return dataArray[0].title ? dataArray : null;
  },
};
