import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage, faCamera, faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const ImgModel = () => {

    const [isTfReady, setIsTfReady] = useState(false);
    const [result, setResult] = useState("N/A");
    const [selectedImage, setSelectedImage] = useState(null);
    const [status, setStatus] = useState(false);
    const [process, setProcess] = useState(false);
    const [model, setModel] = useState(null);

    const load = async () => {
        try {
            // Load mobilenet.
            await tf.ready();
            const loadedModel = await mobilenet.load();
            setIsTfReady(true);
            setModel(loadedModel);
        }
        catch (err) {
            console.log(err);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const predict = async () => {
        if (model && selectedImage) {
            try {
                const imageString = await FileSystem.readAsStringAsync(selectedImage, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                // Convert the string to an ArrayBuffer
                const imageDataArrayBuffer = new Uint8Array(Buffer.from(imageString, 'base64'));
                const imageTensor = decodeJpeg(imageDataArrayBuffer);

                const prediction = await model.classify(imageTensor);

                console.log(prediction);

                setStatus(true);

                setResult(`${prediction[0].className}`);
            } catch (err) {
                console.log(err);
            }
        }
        else {
            console.log("Condition not met to predict")
        }
    };

    useEffect(() => {
        load();
    }, [selectedImage]);

    return (
        <SafeAreaView
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                // gap: 30,
                backgroundColor: "black",
            }}
        >
            <StatusBar backgroundColor='black' barStyle='light-content' translucent={false}></StatusBar>
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 30, marginBottom: 25, marginTop:15 }}>Classification</Text>

            {selectedImage
                ? <Image source={{ uri: selectedImage }} style={{ width: 330, height: 200, borderColor: '#2c3032', borderWidth: 1 }} />
                : <View style={{
                    flexDirection: 'col', alignItems: 'center', width: 330, height: 200, backgroundColor: "#151718", justifyContent: 'center', //Centered vertically
                    alignItems: 'center', // Centered horizontally,
                    borderColor: '#2c3032', borderWidth: 1
                }} >
                    <Image source={require('../../assets/img/picture-icon.png')} style={{ width: 60, height: 40, resizeMode: 'contain' }} />
                </View>}
            <View style={{ backgroundColor: "#1a1d1e", width: 330, borderColor: "#33383a", borderWidth: 1, alignItems: 'center' }}>
                <Text style={{ color: "#7a7f83", padding: 12 }}>Image Preview</Text>
            </View>

            <View style={{ flexDirection: 'col', marginVertical: 20 }}>

                <View style={{ backgroundColor: "#151718", borderWidth: 1, borderColor: "#2b2f31", flexDirection: 'col' }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: "#2b2f31", alignItems: 'center' }}>
                        <View style={{ width: 100, height: 40, }}>
                            <Text style={{ color: "#e7e8e9", margin: 8, fontWeight: "bold" }}>Name</Text>
                        </View>
                        <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "#e7e8e9", margin: 8, fontWeight: "bold" }}>Status</Text>
                        </View>
                        <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "#e7e8e9", margin: 8, fontWeight: "bold" }}>Comment</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "white", margin: 8 }}>Model</Text>
                        </View>

                        {isTfReady ?
                            <View style={{ width: 100, height: 40 }}>
                                <View style={{ marginVertical: 8, backgroundColor: "#0f291e", borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 3, height: 25, width: 90 }}>
                                    <FontAwesomeIcon icon={faCircleCheck} color="#3cb179" size={12} />
                                    <Text style={{ color: "#3cb179", fontSize: 12 }}>Finished</Text>
                                </View>
                            </View>
                            :
                            <View style={{ width: 100, height: 40 }}>
                                <View style={{ marginVertical: 8, backgroundColor: "#10243e", borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 3, height: 25, width: 90 }}>
                                    <ActivityIndicator size={12} color="#52a9ff" />
                                    <Text style={{ color: "#52a9ff", fontSize: 12 }}>Loading</Text>
                                </View>
                            </View>
                        }

                        <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "white", margin: 8 }}>mobilenet</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "white", margin: 8 }}>Choose</Text>
                        </View>
                        {/* <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "white", margin: 8 }}>Model</Text>
                        </View> */}

                        {selectedImage ?
                            <View style={{ width: 100, height: 40 }}>
                                <View style={{ marginVertical: 8, backgroundColor: "#0f291e", borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 3, height: 25, width: 90 }}>
                                    <FontAwesomeIcon icon={faCircleCheck} color="#3cb179" size={12} />
                                    <Text style={{ color: "#3cb179", fontSize: 12 }}>Selected</Text>
                                </View>
                            </View>
                            :
                            <View style={{ width: 100, height: 40 }}>
                                <View style={{ marginVertical: 8, backgroundColor: "#2c2405", borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 3, height: 25, width: 90 }}>
                                    <FontAwesomeIcon icon={faCircleExclamation} color="yellow" size={12} />
                                    <Text style={{ color: "yellow", fontSize: 12 }}>Waiting</Text>
                                </View>
                            </View>
                        }

                        <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "white", margin: 8 }}>Image</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "white", margin: 8 }}>Predict</Text>
                        </View>
                        {process ?
                            <View style={{ width: 100, height: 40 }}>
                                {status ?
                                    <View style={{ marginVertical: 8, backgroundColor: "#0f291e", borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 3, height: 25, width: 90 }}>
                                        <FontAwesomeIcon icon={faCircleCheck} color="#3cb179" size={12} />
                                        <Text style={{ color: "#3cb179", fontSize: 12 }}>Done</Text>
                                    </View>
                                    :
                                    <View style={{ marginVertical: 8, backgroundColor: "#10243e", borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 3, height: 25, width: 90 }}>
                                        <ActivityIndicator size={12} color="#52a9ff" />
                                        <Text style={{ color: "#52a9ff", fontSize: 12 }}>Processing</Text>
                                    </View>
                                }
                            </View>
                            :
                            <View style={{ width: 100, height: 40 }}>
                                <View style={{ marginVertical: 8, backgroundColor: "#2c2405", borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: 3, height: 25, width: 90 }}>
                                    <FontAwesomeIcon icon={faCircleExclamation} color="yellow" size={12} />
                                    <Text style={{ color: "yellow", fontSize: 12 }}>Waiting</Text>
                                </View>
                            </View>
                        }
                        <View style={{ width: 100, height: 40 }}>
                            <Text style={{ color: "white", margin: 8 }}>{result}</Text>
                        </View>
                    </View>

                </View>


                {/* {selectedImage ?
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faCircleCheck} color="green" size={20} />
                        <Text style={{ color: "white" }}>Image Selected</Text>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faCircleExclamation} color="yellow" size={20} />
                        <Text style={{ color: "white" }}>Select Image</Text>
                    </View>
                } */}
            </View>


            <View style={{ flexDirection: "row", gap: 25 }}>
                <TouchableOpacity
                    style={{ padding: 10, flexDirection: 'row', backgroundColor: '#202425', alignItems: 'center', borderColor: '#c4c5c6', borderWidth: 1, borderRadius: 10, gap: 10 }}
                    onPress={pickImage}>
                    <FontAwesomeIcon icon={faImage} size={25} color='white' />
                    <Text style={{ color: '#c4c5c6', fontWeight: '500' }}>
                        Select Image
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ padding: 10, flexDirection: 'row', backgroundColor: '#202425', alignItems: 'center', borderColor: '#c4c5c6', borderWidth: 1, borderRadius: 10, gap: 10 }}
                    onPress={() => console.log("pressed camera")}>
                    <FontAwesomeIcon icon={faCamera} size={25} color='white' />
                    <Text style={{ color: '#c4c5c6', fontWeight: '500' }}>
                        Take Picture
                    </Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity
                style={{ marginTop: 40, flexDirection: 'row', borderColor: '#76e8ef', borderWidth: 1, alignItems: 'center', borderRadius: 30, width: 240, height: 60, justifyContent: 'center' }}
                onPress={() => {
                    if (isTfReady == true && selectedImage != null) {
                        setProcess(true);
                        predict()
                        console.log("Condition Met")
                    }
                    else {
                        console.log("Condition Not Met. Can't Submit")
                    }
                }}>
                <Text style={{ color: '#76e8ef', fontWeight: 'bold' }}>
                    Submit
                </Text>
            </TouchableOpacity>


        </SafeAreaView>
    );
}

export default ImgModel;