import React, { useState } from "react";

const Result = (props) => {
  const [movieDetail, setMovieDetail] = useState(false);

  const boxes = props.movies.map((item, index) => {
    return (
      <Box
        onClick={() => setMovieDetail(true)}
        key={index}
        image={item.poster_path}
        title={item.original_title}
        rating={item.vote_average}
      />
    );
  });
  return (
    <div className="w-full grid md:grid-cols-4 gap-4 mt-5">
      {movieDetail ? <MovieDetail /> : boxes}
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
  // function getMovieDetail() {
  //   axios
  //     .get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=<<api_key>>&language=en-US`)
  //     .then((response) => {
  //       // console.log(response.data.results)
  //       setMovies(response.data.results);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  return <div className="text-4xl shadow">This is movie detail page</div>;
};

export default Result;
