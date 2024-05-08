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
    playlistId: string,
    totalSongs: number
  ): Promise<any> {
    // getting the limits for each call
    let callAmount = totalSongs;
    let calloffets = [0];
    let currentAmount = 0;
    while (callAmount > 100) {
      callAmount = callAmount - 100;
      currentAmount = currentAmount + 100;
      calloffets.push(currentAmount);
    }

    let urls = calloffets.map((limit, index) => {
      return `https://api.spotify.com/v1/playlists/${playlistId}/tracks${
        index !== 0 ? `?offset=${limit}` : ""
      }`;
    });

    let allSongs: any = [];
    for (let i = 0; i < urls.length; i++) {
      try {
        const response = await fetch(urls[i], playlistDetailsParam);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // console.log(response);
        const data = await response.json();
        // console.log(data.items);
        allSongs.push(...data.items);
      } catch (error) {
        console.log(error);
        return null; // or handle the error in some way
      }
    }
    // console.log(allSongs);

    return allSongs;
  },

  fetchArtistDetails: async function (
    artistParams: SpotifyParams,
    uniqueArtistIDs: any
  ): Promise<any> {
    let idsLength = uniqueArtistIDs.length;

    while (idsLength > 0) {
      console.log(uniqueArtistIDs.length);
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
      console.log(stringIDs);

      idsLength -= 49;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists?${stringIDs}`,
          artistParams
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // will need to add them to artists
        const data = await response.json();
        // now we have genres.
        // if any genre is in our array of genres, then add them to songs l
        console.log(`data number #${uniqueArtistIDs.length}: `);
        console.log(data);
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    // // a loop to take 49 songs off
    // let ids = artistIds;
    // let artists = [];
    // while (ids.length) {
    //   let tempIds = [];
    //   for (let i = 0; i < 49; i++) {
    //     tempIds.push(artistIds[i]);
    //   }
    //   ids.splice(0, 49);
    //   console.log("ids: ");
    //   console.log(ids);

    //   console.log(tempIds);
    //   let stringIds = "ids=";
    //   tempIds.forEach((id, index) => {
    //     if (index === tempIds.length - 1) {
    //       stringIds = stringIds + `${id}`;
    //     } else {
    //       stringIds = stringIds + `${id},`;
    //     }
    //   });
    //   console.log(stringIds);
    //   try {
    //     const response = await fetch(
    //       `https://api.spotify.com/v1/artists?${stringIds}`,
    //       artistParams
    //     );
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     // will need to add them to artists
    //     console.log(response);
    //     const data = await response.json();
    //     // now we have genres.
    //     // if any genre is in our array of genres, then add them to songs l
    //     console.log("data: ");
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //     return null;
    //   }
    //   // splice remove first 49
    // }

    // try {
    //   const response = await fetch(
    //     `https://api.spotify.com/v1/artists?${artistIds}`,
    //     artistParams
    //   );
    //   // console.log(response);
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   return response.json();
    // } catch (error) {
    //   console.log(error);
    //   return null;
    // }

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
