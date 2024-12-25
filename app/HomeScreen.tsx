import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { debounce } from 'lodash';
import { fetchLocation } from '@/api/weather';

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false)
    const [location, setLocation] = useState([1, 2, 3])
    // interface Location {
    //     id: number;
    //     name: string;
    // }
    const handleSearch = (value) => {
        if (value.length > 2) {
            console.log(process.env.API_KEY);
            fetchLocation({ cityNme: value }).then((data) => {
                console.log('Api Data:', data);
            })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

    const handleLocation = (loc) => {
        console.log(loc)
    }
    return (
        <View className='flex-1 relative'>
            <StatusBar style='light' />
            <Text className='text-xl text-center m-3'>Welcome to the Weather App!</Text>
            <Image blurRadius={70} source={require('../assets/images/bg.png')} className='absolute w-full h-full' />
            <SafeAreaView className='flex flex-1'>
                <View style={{ height: '7%' }} className='mx-4 relative z-50'>
                    <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? Colors.bgWhite(0.2) : 'transparent' }}>
                        {
                            showSearch ? (
                                <TextInput onChangeText={handleSearch} placeholder='Search City' placeholderTextColor={'lightgray'} className='pl-6 h-16 flex-1 text-base text-white' />
                            ) : null
                        }
                        <TouchableOpacity onPress={() => toggleSearch(!showSearch)} className='rounded-full p-3 m-1' style={{ backgroundColor: Colors.bgWhite(0.3) }}>
                            <MaterialIcons name='search' size={25} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    {
                        location.length > 0 && showSearch ? (
                            <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
                                {
                                    location.map((loc, index) => {
                                        let showBorder = index + 1 != location.length;
                                        let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                                        return (
                                            <TouchableOpacity onPress={() => handleLocation(loc)} key={index} className={'flex-row items-center border-0 p-3 px-4 mb-1' + borderClass}>
                                                <MaterialIcons name='location-on' size={20} color={'gray'} />
                                                <Text className='text-black text-lg ml-2'>Landon, United Kingdom</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ) : null
                    }
                </View>
                <View className='mx-4 flex justify-around flex-1 mb-2'>
                    <Text className='text-white text-center text-2xl font-bold'>London,
                        <Text className='text-lg font-semibold text-gray-300'>
                            United Kingdom
                        </Text>
                    </Text>
                    <View className='flex-row justify-center'>
                        <Image source={require('../assets/images/partlycloudy.png')} className='w-48 h-48' />
                    </View>
                    <View className=''>
                        <Text className='p-3 text-center font-bold text-white text-6xl ml-5'>
                            23&#176;
                        </Text>
                        <Text className='text-center  text-white text-xl tracking-widest'>
                            Partly Cloudy
                        </Text>
                    </View>
                    <View className='flex-row justify-between mx-4'>
                        <View className='flex-row space-x-2 items-center'>
                            <Image source={require('../assets/icons/wind.png')} className='h-6 w-6' />
                            <Text className='text-white font-semibold text-base ml-2 '>
                                22km
                            </Text>
                        </View>
                        <View className='flex-row space-x-2 items-center'>
                            <Image source={require('../assets/icons/drop.png')} className='h-6 w-6' />
                            <Text className='text-white font-semibold text-base ml-2'>
                                23%
                            </Text>
                        </View>
                        <View className='flex-row space-x-2 items-center'>
                            <Image source={require('../assets/icons/sun.png')} className='h-6 w-6' />
                            <Text className='text-white font-semibold text-base ml-2'>
                                6:05 AM
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
                        <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4' style={{ backgroundColor: Colors.bgWhite(0.15) }}>
                            <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11' />
                            <Text className='text-center text-white'>Monday</Text>
                            <Text className='text-center text-white text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4' style={{ backgroundColor: Colors.bgWhite(0.15) }}>
                            <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11' />
                            <Text className='text-center text-white'>Tuesday</Text>
                            <Text className='text-center text-white text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4' style={{ backgroundColor: Colors.bgWhite(0.15) }}>
                            <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11' />
                            <Text className='text-white text-center'>Wednesday</Text>
                            <Text className='text-white text-center text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4' style={{ backgroundColor: Colors.bgWhite(0.15) }}>
                            <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11' />
                            <Text className='text-white text-center'>Thursday</Text>
                            <Text className='text-white text-center text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4' style={{ backgroundColor: Colors.bgWhite(0.15) }}>
                            <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11' />
                            <Text className='text-white text-center'>Friday</Text>
                            <Text className='text-white text-center text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4' style={{ backgroundColor: Colors.bgWhite(0.15) }}>
                            <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11' />
                            <Text className='text-white text-center'>Saturday</Text>
                            <Text className='text-white text-center text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4' style={{ backgroundColor: Colors.bgWhite(0.15) }}>
                            <Image source={require('../assets/images/heavyrain.png')} className='h-11 w-11' />
                            <Text className='text-white text-center'>Sunday</Text>
                            <Text className='text-white text-center text-xl font-semibold'>13&#176;</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
};
