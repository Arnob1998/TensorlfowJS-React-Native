import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const App = () => {

    return (
        <SafeAreaView
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'center',
                // gap: 30,
                backgroundColor: "black",
            }}
        >
            <StatusBar backgroundColor='black' barStyle='light-content' translucent={false}></StatusBar>
                       
            <ScrollView >
                {/* Vision Start */}
                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 30, marginLeft: 15, marginTop: 10}}>Model Collections</Text>
                <Text style={{ color: "#91989c", fontSize: 15, marginLeft: 15, marginTop: 5, marginBottom: 5 }}>Explore pre-trained models to add computer vision, natural language processing (NLP), and other common ML tasks in your mobile.</Text>
                <View>
                    <Text style={{ color: "#369eff", fontWeight: 'bold', fontSize: 25, marginLeft: 15, marginTop: 10, marginBottom: 20 }}>Vision</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView horizontal={true} >
                            <TouchableOpacity
                                style={{position:"relative" ,padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#10243e', alignItems: 'center', borderRadius: 10, borderColor: '#369eff', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { router.push("image_classification") }}>
                                <Image source={require('../assets/img/tile_model_image.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Image
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Classification
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#10243e', alignItems: 'center', borderRadius: 10, borderColor: '#369eff', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { router.push("object_detection") }}>
                                <Image source={require('../assets/img/tile_model_shapes.png')} style={{ width: 60, height: 60 }} />
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
                                <Image source={require('../assets/img/tile_model_people.png')} style={{ width: 60, height: 60 }} />
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
                                onPress={() => { router.push("pose_detection") }}>
                                <Image source={require('../assets/img/tile_model_facemesh.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Face
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Landmarks
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#391a03', alignItems: 'center', borderRadius: 10, borderColor: '#ff802b', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('../assets/img/tile_model_handpose.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Hand
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Pose
                                </Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#391a03', alignItems: 'center', borderRadius: 10, borderColor: '#ff802b', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Coming
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Soon
                                </Text>
                            </TouchableOpacity> */}
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
                                <Image source={require('../assets/img/tile_model_question.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Question
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Answering
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#0f291e', alignItems: 'center', borderRadius: 10, borderColor: '#3cb179', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('../assets/img/tile_model_faces.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Text
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Toxicity
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, marginHorizontal: 10, flexDirection: 'col', backgroundColor: '#0f291e', alignItems: 'center', borderRadius: 10, borderColor: '#3cb179', borderWidth: 1, width: 150, height: 130 }}
                                onPress={() => { console.log("clicked") }}>
                                <Image source={require('../assets/img/tile_model_text.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Universal
                                </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Encoder
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

export default App