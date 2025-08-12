import React, {useEffect, useState} from "react";
import "./css/Carousel.css";

const Carousel = ({searchQuery}) => {
    const [tracks, setTracks] = useState([]);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

  const highlightText = (text, searchTerm) => {
    if(!searchTerm) return text;
    searchTerm = searchTerm.trim();

    const regex = new RegExp(`(${searchTerm})`, 'ig');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{backgroundColor: 'yellow'}}>{part}</span>
      ) : (
        part
      )
    );
  };

    const fetchSongs = async () => {
        try {
            const params = new URLSearchParams();
            if(searchQuery) params.append("search", searchQuery);

            const response = await fetch(`http://127.0.0.1:8080/get_tracks?${params.toString()}`);
            if(!response.ok) {
                throw new Error('Failed to fetch songs');
            }

            const data = await response.json();
            setTracks(data || []);
        } catch(err) {
            console.log(err.message);
        }
    }

    const baseUrl = "http://localhost:5173"
    const goToPlayer = (songName) => {
        window.location.href = baseUrl + "/" + songName;
    }
    useEffect(() => {
        fetchSongs();
    }, [searchQuery]);

    return (
        <div id="carousel-container">
            <div id="songs-heading">
                <h3>Songs</h3>
            </div>
            <div id="item-container">
                {tracks.map((track, index) => (
                    <div key={`${track.title}-${searchQuery}`}>
                        <div>
                            <img src={track.image_url} className="song-img" alt={track.title} onClick={() => goToPlayer(track.title)}></img>
                            <h3>{highlightText(track.title, searchQuery)}</h3>
                            <p>{new Date(track.release_date).toLocaleDateString(('en-US', options))}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;