import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';

import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage, faCamera, faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const router = useRouter()

    return (
        <SafeAreaView
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'center',
                // gap: 30,
                backgroundColor: "black"
            }}
        >

            <ScrollView >
                {/* Vision Start */}
                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 30, marginLeft: 15}}>Header</Text>
                <Text style={{ color: "#91989c", fontSize: 15, marginLeft: 15, marginTop: 5, marginBottom: 5 }}>Explore pre-trained models to add computer vision, natural language processing (NLP), and other common ML tasks to your web and browser-based applications.</Text>
                <View>
                    <Text style={{ color: "#369eff", fontWeight: 'bold', fontSize: 25, marginLeft: 15, marginTop: 10, marginBottom: 20 }}>Vision</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView horizontal={true} >
                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#10243e', alignItems: 'center', borderRadius: 10, borderColor: '#369eff', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_image.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Image
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Classification
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#10243e', alignItems: 'center', borderRadius: 10, borderColor: '#369eff', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_shapes.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Object
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Detection
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#10243e', alignItems: 'center', borderRadius: 10, borderColor: '#369eff', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_people.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Semantic
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Segmentation
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                {/* Vision End */}
                {/* Posture Start */}
                <View>
                    <Text style={{ color: "#ff802b", fontWeight: 'bold', fontSize: 25, marginLeft: 15, marginTop: 20, marginBottom: 20 }}>Posture</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView horizontal={true} >
                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#391a03', alignItems: 'center', borderRadius: 10, borderColor: '#ff802b', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_image.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Image
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Classification
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#391a03', alignItems: 'center', borderRadius: 10, borderColor: '#ff802b', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_shapes.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Object
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Detection
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#391a03', alignItems: 'center', borderRadius: 10, borderColor: '#ff802b', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_people.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Semantic
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Segmentation
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                {/* Posture End */}
                {/* Text Start */}
                <View>
                    <Text style={{ color: "#3cb179", fontWeight: 'bold', fontSize: 25, marginLeft: 15, marginTop: 20, marginBottom: 20 }}>Text</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView horizontal={true} >
                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#0f291e', alignItems: 'center', borderRadius: 10, borderColor: '#3cb179', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_image.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Image
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Classification
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#0f291e', alignItems: 'center', borderRadius: 10, borderColor: '#3cb179', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_shapes.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Object
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Detection
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#0f291e', alignItems: 'center', borderRadius: 10, borderColor: '#3cb179', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('./assets/img/tile_model_people.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Semantic
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Segmentation
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                {/* Text End */}
            </ScrollView>
        </SafeAreaView>
    );
};


export default App;
