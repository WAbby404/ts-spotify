type RecommendedProps = {
  recommendedSongs: string[];
};

function Recommended({ recommendedSongs }: RecommendedProps) {
  // MAYBE can do recommended playlists based on selected genres?
  return (
    <div className="bg-[#0B1A0B]/75 rounded-sm p-2 md:w-[90%] xl:w-full xl:col-span-6 xl:row-span-1 xl:h-full border-4 border-indigo-500/50">
      <div
        className="flex gap-2 justify-center items-center"
        // onClick={() => setClosed(!closed)}
      >
        <img
          src={require("../images/recommended.png")}
          alt="Playlist icon"
          className="w-7"
        />
        <h1 className="text-white">Recommended songs</h1>
        <button className={`xl:hidden text-white font-bold`}>
          {/* {closed ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
        </button>
      </div>
      {/* when useEffect updates, change recommended to whatever songs are recommended in that genre */}
      {/* if song is added to playlist, remove it from this list */}
    </div>
  );
}

export default Recommended;
