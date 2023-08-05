import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState([1, 2]);
  const handelLocation = (loc) => {
    console.log("loc", loc);
  };
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/bg.png")}
        className="absolute w-full h-full"
        blurRadius={70}
      />
      <SafeAreaView className="flex flex-1">
        {/*search section*/}
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
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
          {location.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {location.map((loc, index) => {
                let showBorder = index + 1 != location.length;
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
                      London,United Kingdom
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
            London,
            <Text className="text-gray-300 text-lg font-semibold">
              United Kingdom
            </Text>
          </Text>
          {/*weather image*/}
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            ></Image>
          </View>
          {/*degree celcius*/}
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              23&#176;
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              Partly Cloudy
            </Text>
          </View>
          {/*other stats*/}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/mist.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/sun.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22%</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/heavyrain.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22km</Text>
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
              <View
                className="flex justify-center items-center space-y-1 mr-4 w-24 rounded-3xl py-3"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="h-11 w-11"
                />
                <Text className="text-white"> Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  20&#176;
                </Text>
              </View>
              <View
                className="flex justify-center items-center space-y-1 mr-4 w-24 rounded-3xl py-3"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="h-11 w-11"
                />
                <Text className="text-white"> Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  20&#176;
                </Text>
              </View>
              <View
                className="flex justify-center items-center space-y-1 mr-4 w-24 rounded-3xl py-3"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="h-11 w-11"
                />
                <Text className="text-white"> Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  20&#176;
                </Text>
              </View>
              <View
                className="flex justify-center items-center space-y-1 mr-4 w-24 rounded-3xl py-3"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="h-11 w-11"
                />
                <Text className="text-white"> Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  20&#176;
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
