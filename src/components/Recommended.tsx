type RecommendedProps = {
  recommendedSongs: string[];
};

function Recommended({ recommendedSongs }: RecommendedProps) {
  return (
    <div>
      {/* when useEffect updates, change recommended to whatever songs are recommended in that genre */}
      {/* if song is added to playlist, remove it from this list */}
    </div>
  );
}

export default Recommended;
