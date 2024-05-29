import {
  SpotifyParams,
  UserData,
  PlaylistData,
  PlaylistTrackObject,
  PlaylistBaseObject,
} from "./types";

export const MusicAPI = {
  // Get playlist data
  fetchUserData: async function (
    profileParams: SpotifyParams,
    profileId: string
  ): Promise<UserData | null> {
    let userObj: UserData = {
      name: "",
      img: "",
      id: "",
    };

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me",
        profileParams
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.display_name && data.images) {
        userObj = {
          name: data.display_name,
          img: data.images[0].url,
          id: data.id,
        };
        profileId = data.id;
        // console.log(data);

        return userObj;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null; // or handle the error in some way
    }
  },

  // Get Playlists
  fetchPlaylistData: async function (
    playlistParams: SpotifyParams,
    profileId: string
  ): Promise<PlaylistData[] | null> {
    let dataArray: PlaylistData[] = [];
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${profileId}/playlists`,
        playlistParams
      );
      if (!response.ok) {
        // console.log(response);
        // console.log("weird response");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("data var");
      // console.log(data);
      // console.log("data items:");
      // console.log(dataArray);
      // console.log(data.items);
      // console.table(data.items);
      dataArray = data.items.map((playlist: any) => {
        return {
          title: playlist.name,
          img: playlist.images[0].url,
          playlistId: playlist.id,
          totalSongs: playlist.tracks.total,
        };
      });
      // console.log("dataArray");
      // console.log(dataArray);
      // console.table(dataArray);
      return dataArray[0].playlistId ? dataArray : null;
    } catch (error) {
      console.log("error");
      console.log(error);
      return null;
    }
  },

  // Get Playlist Songs
  fetchPlaylistTracks: async function (
    playlistDetailsParam: SpotifyParams,
    playlistId: string,
    totalSongs: number
    // an array of song objects
  ): Promise<PlaylistTrackObject[] | null> {
    // Getting the call limits based on length for each call
    let callAmount = totalSongs;
    let calloffets = [0];
    let currentAmount = 0;
    while (callAmount > 100) {
      callAmount = callAmount - 100;
      currentAmount = currentAmount + 100;
      calloffets.push(currentAmount);
    }

    // Making the url endpoints based on the limits
    let urls = calloffets.map((limit, index) => {
      return `https://api.spotify.com/v1/playlists/${playlistId}/tracks${
        index !== 0 ? `?offset=${limit}` : ""
      }`;
    });

    const allSongs: PlaylistTrackObject[] = [];

    try {
      await Promise.all(
        urls.map((url) =>
          fetch(url, playlistDetailsParam).then((r) => r.json())
        )
      ).then((response) => {
        console.log(response);
        response.forEach((songChunk) => {
          allSongs.push(...songChunk.items);
        });
      });
    } catch (error) {
      console.log("promise.all error");
      console.log(error);
      return null; // or handle the error in some way
    }

    return allSongs;
  },

  // Get Artist Details
  fetchArtistDetails: async function (
    artistParams: SpotifyParams,
    uniqueArtistIDs: any
  ): Promise<any> {
    let idsLength = uniqueArtistIDs.length;
    let allArtists = [];
    // Grab 49 artistIDs at a time for an API call with 49 as the limit
    while (idsLength > 0) {
      let tempIDs = [];
      for (let i = 0; i < 49; i++) {
        tempIDs.push(uniqueArtistIDs[i]);
      }
      uniqueArtistIDs.splice(0, 49);

      // put all ids in a string for API call
      let stringIDs = "ids=";
      tempIDs.forEach((id, index) => {
        if (index === tempIDs.length - 1 && id !== undefined) {
          stringIDs += `${id}`;
        } else if (id !== undefined) {
          stringIDs += `${id},`;
        }
      });

      idsLength -= 49;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists?${stringIDs}`,
          artistParams
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Add all artists to an array (this is how we get genres of the songs)
        allArtists.push(...data.artists);
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    return allArtists;
  },

  createSpotifyPlaylist: async function (
    newPlaylistParams: any,
    profileId: string
  ): Promise<PlaylistBaseObject | null> {
    let data;
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${profileId}/playlists`,
        newPlaylistParams
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      data = await response.json();
      // console.log("new playlist added to spotify:");
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  addSpotifyPlaylistImage: async function (
    newPlaylistImageParams: any,
    playlistId: string
  ): Promise<any> {
    // console.log("playlistId");
    // console.log(playlistId);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/images`,
        newPlaylistImageParams
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
