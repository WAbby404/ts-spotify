import {
  SpotifyParams,
  UserData,
  UserObjectPublic,
  PlaylistData,
  ListOfUsersPlaylistsResponse,
  MultipleArtistsResponse,
} from "./types";

export const MusicAPI = {
  fetchUserData: async function (
    profileParams: SpotifyParams,
    profileId: string
  ): Promise<UserData> {
    let userObj: UserData = {
      name: "",
      img: "",
      id: "",
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
            id: data.id,
          };
        }
        //else give them a temporary name & image?
        profileId = data.id;
        console.log(data);
        // console.log(userObj);
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
  ): Promise<string | null> {
    let artistIdsForFetch: string = "ids=";

    // need to change limit to call rest of playlist
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        playlistDetailsParam
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const artistIds = new Set<string>([]);
      console.log(data);
      data.items.forEach((song: any) => {
        // lower this to 49?
        if (song.track.artists.length === 1 && artistIds.size < 100) {
          artistIds.add(song.track.artists[0].id);
        } else if (artistIds.size < 100) {
          song.track.artists.forEach((artist: any) => {
            artistIds.add(artist.id);
          });
        }
      });

      // THIS IS THE ERROR! fix this tomorrow! the several artists call only supports 50 artists, not 100
      let counter = 0;
      artistIds.forEach((value, key) => {
        // FIX THE CALL TO BE 50! or less
        if (counter < artistIds.size - 43) {
          artistIdsForFetch += `${value},`;
        }

        counter++;
      });
      console.log(counter);
      counter = 0;

      console.log("artistIds thing " + artistIdsForFetch);
      return artistIdsForFetch;
    } catch (error) {
      console.log(error);
      return null; // or handle the error in some way
    }
  },

  fetchArtistDetails: async function (
    artistParams: SpotifyParams,
    artistIds: string
  ): Promise<MultipleArtistsResponse | null> {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists?${artistIds}`,
        artistParams
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }

    // fetch(`https://api.spotify.com/v1/artists?${artistIds}`, artistParams)
    //   .then((result) => {
    //     if (!result.ok) {
    //       console.log(result);
    //       // console.log("bad result ids: " + artistIds);
    //       throw new Error("Network response was not ok");
    //     }
    //     return result.json();
    //   })
    //   .then((data) => {
    //     console.log("fetch response data: " + data);
    //     console.log(data);
    //     return data;
    //   })
    //   .catch((error) => console.log(error));
    // return "string";
  },
};
