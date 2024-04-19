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

  fetchPlaylistTracks: async function (
    playlistDetailsParam: SpotifyParams,
    playlistId: string
  ): Promise<string> {
    let artistIdsForFetch: string = "ids=";
    fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      playlistDetailsParam
    )
      .then((result) => {
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then((data) => {
        const artistIds = new Set<string>([]);
        data.items.forEach((song: any) => {
          // console.log(song);
          if (song.track.artists.length === 1 && artistIds.size < 100) {
            // unless if artistIds = 100
            artistIds.add(song.track.artists[0].id);
          } else if (artistIds.size < 100) {
            song.track.artists.forEach((artist: any) => {
              artistIds.add(artist.id);
            });
          }
        });
        // get an array of artist ids (for genres in playlist)
        console.log(artistIds.size);
        // this might be making it a bad call, an extra , at the end
        let counter = 0;
        artistIds.forEach((value, key) => {
          if (counter + 1 === artistIds.size) {
            artistIdsForFetch += `${value}`;
          } else {
            artistIdsForFetch += `${value},`;
          }
          counter++;
        });
        counter = 0;

        console.log(artistIdsForFetch);
      })
      .catch((error) => console.log(error));
    return artistIdsForFetch;
  },
};

// let artistIdsCorrectStructure: string = "ids=";

// // need to move below to a getGenres fn

// fetch(
//   `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
//   playlistDetailsParam
// )
//   .then((result) => {
//     if (!result.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return result.json();
//   })
//   .then((data) => {
//     // console.log(data);
//     const artistIds = new Set<string>([]);
//     data.items.forEach((song: any) => {
//       // console.log(song);
//       if (song.track.artists.length === 1 && artistIds.size < 100) {
//         // unless if artistIds = 100
//         artistIds.add(song.track.artists[0].id);
//       } else if (artistIds.size < 100) {
//         song.track.artists.forEach((artist: any) => {
//           artistIds.add(artist.id);
//         });
//       }
//     });
//     // get an array of artist ids (for genres in playlist)
//     console.log(artistIds.size);
//     // this might be making it a bad call, an extra , at the end
//     artistIds.forEach((value, key) => {
//       console.log(key);
//       artistIdsCorrectStructure += `${value},`;
//     });

//     console.log(artistIdsCorrectStructure);

//     // make multiple artist call to spotify
//   })
//   .catch((error) => console.log(error));
