import React, { useState } from "react";
import axios from "axios";

const Result = (props) => {
  const [movieDetail, setMovieDetail] = useState(false);
  const [singleMovie, setSingleMovie] = useState({});
  const [genres, setGenres] = useState([])

  const clickedMovie = (props, index) => {
    setMovieDetail(true);
    console.log("index is ", index);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${index}?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`
      )
      .then((response) => {
        console.log(response.data);
        setGenres(response.data.genres)
        setSingleMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const boxes = props.movies.map((item, index) => {
    return (
      <Box
        onClick={() => clickedMovie(item, item.id)}
        key={index}
        image={item.poster_path}
        title={item.original_title}
        rating={item.vote_average}
      />
    );
  });

  return (
    <div className="w-full mt-5">
      {movieDetail ? (
        <div>
          <button
            onClick={() => setMovieDetail(false)}
            className="transition ease-in-out delay-150 bg-blue-500 p-2 rounded-lg text-white font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
          >
            Go back
          </button>
          <MovieDetail
            title={singleMovie.title}
            image={singleMovie.poster_path}
            status={singleMovie.status}
            releaseDate = {singleMovie.release_date}
            genres = {genres}
          />
        </div>
      ) : (
        <div className="w-full grid md:grid-cols-4 gap-4">{boxes}</div>
      )}
    </div>
  );
};

const Box = (props) => {
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  return (
    <div className="shadow min-h-[200px] mt-3 pb-1" onClick={props.onClick}>
      <img src={IMGPATH + props.image} alt="" className="w-full" />
      <div className="flex justify-between px-2 items-center">
        <span className="text-2xl">{props.title}</span>
        <span className="text-xl text-yellow-500 font-bold">
          {props.rating}
        </span>
      </div>
    </div>
  );
};

const MovieDetail = (props) => {
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  return (
    <div className="w-full grid grid-cols-4 gap-4 mt-5">
      <img
        src={IMGPATH + props.image}
        alt=""
        className="w-full  rounded-2xl hover:shadow-2xl"
      />
      <div className="col-span-3">
        <h2 className="text-4xl font-bold">{props.title}</h2>
        <p className="text-xl mb-2">{props.status} on {props.releaseDate}</p>
        { props.genres.map((item)=>{
          return(
            <span className="mr-2 border border-spacing-1 border-black rounded-xl px-2 p-1 ">{item.name}</span>
          )
        })}
      </div>
    </div>
  );
};

export default Result;
