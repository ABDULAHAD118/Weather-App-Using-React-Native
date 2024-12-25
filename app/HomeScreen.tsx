import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { debounce } from 'lodash';
import { fetchLocation, fetchWeatherForecast } from '@/api/weather';
import { weatherImages } from '@/constants/weatherImages';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false)
    const [locations, setLocations] = useState<Location[]>([])

    const [weather, setWeather] = useState<any>({})
    const [loading, setLoading] = useState(true);
    interface Location {
        name: string;
        country: string;
    }

    const handleSearch = (value: string) => {
        if (value.length > 2) {
            fetchLocation({ cityName: value }).then((data) => {
                if (data && Array.isArray(data)) {
                    setLocations(data);
                } else {
                    setLocations([]);
                }
            })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

    const fetchMyWeatherData = async () => {
        let city = await AsyncStorage.getItem('city');
        let cityName = 'Burewala';
        if (city) cityName = city;
        fetchWeatherForecast({
            cityName,
            days: 7
        }).then((data) => {
            if (data) {
                setWeather(data);
            }
            setLoading(false);
        })
    }
    useEffect(() => {
        fetchMyWeatherData();
    }, [])

    const handleLocation = (loc: Location) => {
        setLocations([]);
        toggleSearch(false);
        setLoading(true);
        fetchWeatherForecast({
            cityName: loc.name,
            days: 7
        }).then((data) => {
            setWeather(data);
            setLoading(false);
            AsyncStorage.setItem('city', loc.name);
        })
    }
    const { current, location } = weather;
    return (
        <View className='flex-1 relative'>
            <StatusBar style='light' />
            <Text className='text-xl text-center m-3'>Welcome to the Weather App!</Text>
            <Image blurRadius={70} source={require('../assets/images/bg.png')} className='absolute w-full h-full' />
            {
                loading ? (
                    <View className='flex-1 flex-row justify-center items-center'>
                        <Progress.CircleSnail thickness={5} size={100} color='white' />
                    </View>
                ) : (
                    <SafeAreaView className='flex flex-1'>
                        <View style={{ height: '7%' }} className='mx-4 relative z-50'>
                            <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? Colors.bgWhite(0.2) : 'transparent' }}>
                                {
                                    showSearch ? (
                                        <TextInput onChangeText={handleTextDebounce} placeholder='Search City' placeholderTextColor={'lightgray'} className='pl-6 h-16 flex-1 text-base text-white' />
                                    ) : null
                                }
                                <TouchableOpacity onPress={() => toggleSearch(!showSearch)} className='rounded-full p-3 m-1' style={{ backgroundColor: Colors.bgWhite(0.3) }}>
                                    <MaterialIcons name='search' size={25} color={'white'} />
                                </TouchableOpacity>
                            </View>
                            {
                                locations?.length > 0 && showSearch ? (
                                    <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
                                        {
                                            locations.map((loc, index) => {
                                                let showBorder = index + 1 != locations.length;
                                                let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                                                return (
                                                    <TouchableOpacity onPress={() => handleLocation(loc)} key={index} className={'flex-row items-center border-0 p-3 px-4 mb-1' + borderClass}>
                                                        <MaterialIcons name='location-on' size={20} color={'gray'} />
                                                        <Text className='text-black text-lg ml-2'>{loc?.name},{loc?.country}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                ) : null
                            }
                        </View>
                        <View className='mx-4 flex justify-around flex-1 mb-2'>
                            <Text className='text-white text-center text-2xl font-bold'>{location?.name},
                                <Text className='text-lg font-semibold text-gray-300'>
                                    {location?.country}
                                </Text>
                            </Text>
                            <View className='flex-row justify-center'>
                                <Image source={weatherImages[current?.condition?.text as keyof typeof weatherImages || 'default']} className='w-48 h-48' />
                            </View>
                            <View className=''>
                                <Text className='p-3 text-center font-bold text-white text-6xl ml-5'>
                                    {current?.temp_c}&#176;
                                </Text>
                                <Text className='text-center  text-white text-xl tracking-widest'>
                                    {current?.condition?.text}
                                </Text>
                            </View>
                            <View className='flex-row justify-between mx-4'>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image source={require('../assets/icons/wind.png')} className='h-6 w-6' />
                                    <Text className='text-white font-semibold text-base ml-2 '>
                                        {current?.wind_kph}km
                                    </Text>
                                </View>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image source={require('../assets/icons/drop.png')} className='h-6 w-6' />
                                    <Text className='text-white font-semibold text-base ml-2'>
                                        {current?.humidity}%
                                    </Text>
                                </View>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image source={require('../assets/icons/sun.png')} className='h-6 w-6' />
                                    <Text className='text-white font-semibold text-base ml-2'>
                                        {weather?.forecast?.forecastday?.[0]?.astro?.sunrise}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className='mb-2 space-y-3'>
                            <View className='flex-row items-center m-5 '>
                                <MaterialIcons name='calendar-month' size={22} color={'white'} />
                                <Text className='text-white text-base'>Daily Forecast</Text>
                            </View>
                            <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 15 }} showsHorizontalScrollIndicator={false}>

                                {
                                    weather?.forecast?.forecastday?.map((day: {
                                        date?: string;
                                        day?: {
                                            condition?: {
                                                text?: string;
                                            };
                                            avgtemp_c?: number;
                                        };
                                    }, index: number) => {
                                        let date = new Date(day?.date || '');
                                        let options: Intl.DateTimeFormatOptions = { weekday: 'long' };
                                        let dayName = date.toLocaleDateString('en-US', options);
                                        dayName.split(',')[0];
                                        return (
                                            <View key={index} className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4' style={{ backgroundColor: Colors.bgWhite(0.15) }}>
                                                <Image source={weatherImages[day?.day?.condition?.text as keyof typeof weatherImages || 'default']} className='h-11 w-11' />
                                                <Text className='text-center text-white'>{dayName}</Text>
                                                <Text className='text-center text-white text-xl font-semibold'>{day?.day?.avgtemp_c}&#176;</Text>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                )
            }

        </View>
    );
};
