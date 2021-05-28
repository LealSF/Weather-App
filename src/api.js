const key = "918649a27f9cbf4db6d024f84dc932de";

//request waether in the day
const reqCity = async (city) => {
  const baseURL = "http://api.openweathermap.org/data/2.5/weather";
  const query = "?q=" + city + "&appid=" + key;

  //buat panggil fetch
  const response = await fetch(baseURL + query);

  //call promise data
  const data = await response.json();
  return data;
};
