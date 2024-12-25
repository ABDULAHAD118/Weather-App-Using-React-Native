import axios from 'axios'

interface Params {
    cityName: string;
    days?: number;
}

interface ApiResponse {
    data: any;
}

interface ApiCallOptions {
    method: string;
    url: string;
}

const forecastEndPoint = (params: Params): string => `https://api.weatherapi.com/v1/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationEndPoint = (params: Params): string => `https://api.weatherapi.com/v1/search.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${params.cityName}`;

const apiCall = async (endPoint: string): Promise<ApiResponse | null> => {
    const option: ApiCallOptions = {
        method: 'GET',
        url: endPoint
    };
    try {
        const response: ApiResponse = await axios.request(option);

        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchWeatherForecast = (params: Params): Promise<ApiResponse | null> => {
    return apiCall(forecastEndPoint(params));
};

export const fetchLocation = (params: Params): Promise<ApiResponse | null> => {
    return apiCall(locationEndPoint(params));
};
