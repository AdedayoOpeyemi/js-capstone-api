

const getAllShows = async () => {
  const response = await fetch('https://api.tvmaze.com/shows');
  const data = await response.json();
  console.log( await data)
  return result;
};

export { getAllShows }