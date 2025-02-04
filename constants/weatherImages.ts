type WeatherCondition =
  | "Partly Cloudy"
  | "Partly Cloudy "
  | "Moderate rain"
  | "Moderate rain "
  | "Patchy rain nearby"
  | "Patchy rain nearby "
  | "Sunny"
  | "Sunny "
  | "Clear"
  | "Clear "
  | "Overcast"
  | "Overcast "
  | "Cloudy"
  | "Cloudy "
  | "Light rain"
  | "Light rain "
  | "Light rain shower"
  | "Light rain shower "
  | "Moderate rain at times"
  | "Moderate rain at times "
  | "Heavy rain"
  | "Heavy rain "
  | "Heavy rain at times"
  | "Heavy rain at times "
  | "Moderate or heavy freezing rain"
  | "Moderate or heavy freezing rain "
  | "Moderate or heavy rain shower"
  | "Moderate or heavy rain shower "
  | "Moderate or heavy rain with thunder"
  | "Moderate or heavy rain with thunder "
  | "Mist"
  | "Mist "
  | "Fog"
  | "Fog "
  | "other";

export const weatherImages: Record<WeatherCondition, any> = {
  "Partly Cloudy": require("../assets/images/partlycloudy.png"),
  "Partly Cloudy ": require("../assets/images/partlycloudy.png"),
  "Moderate rain": require("../assets/images/moderaterain.png"),
  "Moderate rain ": require("../assets/images/moderaterain.png"),
  "Patchy rain nearby": require("../assets/images/moderaterain.png"),
  "Patchy rain nearby ": require("../assets/images/moderaterain.png"),
  "Sunny": require("../assets/images/sun.png"),
  "Sunny ": require("../assets/images/sun.png"),
  "Clear": require("../assets/images/sun.png"),
  "Clear ": require("../assets/images/sun.png"),
  "Overcast": require("../assets/images/cloud.png"),
  "Overcast ": require("../assets/images/cloud.png"),
  "Cloudy": require("../assets/images/cloud.png"),
  "Cloudy ": require("../assets/images/cloud.png"),
  "Light rain": require("../assets/images/moderaterain.png"),
  "Light rain ": require("../assets/images/moderaterain.png"),
  "Light rain shower": require("../assets/images/moderaterain.png"),
  "Light rain shower ": require("../assets/images/moderaterain.png"),
  "Moderate rain at times": require("../assets/images/moderaterain.png"),
  "Moderate rain at times ": require("../assets/images/moderaterain.png"),
  "Heavy rain": require("../assets/images/heavyrain.png"),
  "Heavy rain ": require("../assets/images/heavyrain.png"),
  "Heavy rain at times": require("../assets/images/heavyrain.png"),
  "Heavy rain at times ": require("../assets/images/heavyrain.png"),
  "Moderate or heavy freezing rain": require("../assets/images/heavyrain.png"),
  "Moderate or heavy freezing rain ": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain shower": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain shower ": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain with thunder ": require("../assets/images/heavyrain.png"),
  "other": require("../assets/images/moderaterain.png"),
  "Mist": require("../assets/images/mist.png"),
  "Mist ": require("../assets/images/mist.png"),
  "Fog": require("../assets/images/mist.png"),
  "Fog ": require("../assets/images/mist.png"),
};
