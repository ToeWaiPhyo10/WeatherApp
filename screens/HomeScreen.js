import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { fetchLocationData, fetchWeatherForecastData } from "../api/weather";
import { debounce } from "lodash";
import { weatherImages } from "../constants";
import * as Progress from "react-native-progress";
import { getData, storeData } from "../utils/asyncStorage";

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handelLocation = (loc) => {
    setLocations([]);
    setShowSearch(false);
    setLoading(true);
    fetchWeatherForecastData({ cityName: loc.name, days: "7" }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", loc.name);
    });
  };
  const handleSearch = async (value) => {
    //fetch location
    if (value.length > 2) {
      fetchLocationData({ cityName: value }).then((data) => setLocations(data));
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;
  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = myCity || "Myanmar";
    fetchWeatherForecastData({ cityName: cityName, days: "7" }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchMyWeatherData();
  }, []);
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/bg.png")}
        className="absolute w-full h-full"
        blurRadius={70}
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center  items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/*search section*/}
          <View style={{ height: "7%" }} className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search City"
                  placeholderTextColor={"lightgray"}
                  className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                />
              ) : null}

              <TouchableOpacity
                onPress={() => setShowSearch(!showSearch)}
                style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="rounded-full p-3 m-1"
              >
                <MagnifyingGlassIcon size={25} color={"white"} />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  let borderClass = showBorder
                    ? "border-b-2 border-b-gray-400"
                    : "";
                  return (
                    <TouchableOpacity
                      key={index}
                      className={
                        "flex-row items-center border-0 p-3 px-4 mb-1 " +
                        borderClass
                      }
                      onPress={() => handelLocation(loc)}
                    >
                      <MapPinIcon size={20} color={"gray"} />
                      <Text className="text-black text-lg ml-2">
                        {loc?.name},{loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/*forecast section*/}
          <View className="mx-4 justify-around flex-1 mb-2">
            {/*location detail*/}
            <Text className="text-white text-center text-2xl font-bold">
              {location?.name},
              <Text className="text-gray-300 text-lg font-semibold">
                {" " + location?.country}
              </Text>
            </Text>
            {/*weather image*/}
            <View className="flex-row justify-center">
              <Image
                source={weatherImages[current?.condition?.text]}
                className="w-52 h-52"
              ></Image>
            </View>
            {/*degree celcius*/}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>
            {/*other stats*/}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/wind.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/drop.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/sun.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
            {/*forecast for next days*/}

            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-5 space-x-2">
                <CalendarDaysIcon size={22} color={"white"} />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather?.forecast?.forecastday?.map((data, index) => {
                  let date = new Date(data?.date);
                  let options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];

                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center space-y-1 mr-4 w-24 rounded-3xl py-3"
                      style={{ backgroundColor: theme.bgWhite(0.15) }}
                    >
                      <Image
                        source={weatherImages[data?.day?.condition?.text]}
                        className="h-11 w-11"
                      />
                      <Text className="text-white"> {dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {data?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;
