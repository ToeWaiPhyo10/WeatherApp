import axios from "axios";
import { apiKey } from "../constants";

const forecastEndpoint = (params) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationEndpoint = (params) =>
  `http://api.weatherapi.com/v1/search.json?key=060019249170400596a33859230508&q=${params.cityName}`;
const apiCall = async (endpoint) => {
  const option = {
    method: `GET`,
    url: endpoint,
  };
  try {
    const response = await axios.request(option);
    return response.data;
  } catch (err) {
    console.log("err", err);
    return null;
  }
};
export const fetchWeatherForecastData = (params) => {
  return apiCall(forecastEndpoint(params));
};
export const fetchLocationData = (params) => {
  return apiCall(locationEndpoint(params));
};
