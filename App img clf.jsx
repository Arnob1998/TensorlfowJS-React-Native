import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet  } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as jpeg from "jpeg-js";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage, faCamera, faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const image = useRef(null);

  const load = async () => {
    try {
      // Load mobilenet.
      await tf.ready();

      const model = await mobilenet.load();
      
      setIsTfReady(true);

      if (selectedImage) {

        const imageString = await FileSystem.readAsStringAsync(selectedImage, {
          encoding: FileSystem.EncodingType.Base64,
        });
        // Convert the string to an ArrayBuffer
        const imageDataArrayBuffer = new Uint8Array(Buffer.from(imageString, 'base64'));
        const imageTensor = decodeJpeg(imageDataArrayBuffer);

        // Resize the image to match the expected input shape (128x128)
        const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [128, 128]);
        // Expand dimensions to create a batch of size 1
        const batchedImageTensor = resizedImageTensor.expandDims(0);

        // Perform inference
        const prediction = await model.classify(imageTensor);
        console.log(prediction)

        setResult(
          `${prediction[0].className} (${prediction[0].probability.toFixed(3)})`
        );
      }
    } catch (err) {
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
        justifyContent: 'center',
        gap:30
      }}
    >
      {/* <Button title="Pick an Image" onPress={pickImage} /> */}
      {selectedImage
        ? <Image source={{ uri: selectedImage }} style={{ width: 300, height: 200 }} />
        : <View style={{
          flexDirection: 'col', alignItems: 'center', width: 300, height: 200, backgroundColor: "white", justifyContent: 'center', //Centered vertically
          alignItems: 'center', // Centered horizontally,
          borderColor : 'grey', borderWidth:1 
        }} >
          <Image source={require('./assets/img/image.png')} style={{ width: 60, height: 60 }} />
          <Text>Image Preview</Text>
        </View>}

      <View style={{ flexDirection: 'col', gap: 5 }}>
        {isTfReady ?
          <View style={{ flexDirection: 'row', gap: 5,  alignItems: 'center' }}>
            <FontAwesomeIcon icon={faCircleCheck} color="green" size={20}/>
            <Text>Model Loaded</Text>
          </View>
          :
          <View style={{ flexDirection: 'row', gap: 5 ,  alignItems: 'center'}}>
            <ActivityIndicator size="small" color="#5DADE2" />
            <Text>Loading Model</Text>
          </View>}
        
        {selectedImage ?
          <View style={{ flexDirection: 'row', gap: 5,  alignItems: 'center' }}>
            <FontAwesomeIcon icon={faCircleCheck} color="green" size={20}/>
            <Text>Image Selected</Text>
          </View>
          :
          <View style={{ flexDirection: 'row', gap: 5,  alignItems: 'center' }}>
          <FontAwesomeIcon icon={faCircleExclamation} color="yellow" size={20}/>
            <Text>Select Image</Text>
          </View>
         }

      </View>

      <View style={{ flexDirection: "row", gap: 25 }}>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'col', backgroundColor: '#3578E5', alignItems: 'center' , borderRadius: 10}}
          onPress={pickImage}>
          <FontAwesomeIcon icon={faImage} size={40} color='white'/>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Select Image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'col', backgroundColor: '#3578E5', alignItems: 'center', borderRadius: 10 }}
          onPress={() => console.log("pressed camera")}>
          <FontAwesomeIcon icon={faCamera} size={40} color='white'/>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Take Picture
          </Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity
          style={{ marginTop: 40, flexDirection: 'row', borderColor : 'blue', borderWidth:1 ,alignItems: 'center', borderRadius: 30, width:240, height: 60, justifyContent: 'center'}}
          onPress={() => console.log("pressed camera")}>
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>
            Submit
          </Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
};


export default App;
