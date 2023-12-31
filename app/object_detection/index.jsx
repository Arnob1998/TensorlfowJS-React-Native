import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  LogBox,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
const TensorCamera = cameraWithTensors(Camera);
import * as cocoSSd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Canvas from "react-native-canvas";

const { width, height } = Dimensions.get("window");
LogBox.ignoreAllLogs(true);
export default function App() {

  const [model, setModel] = useState();
  let context = useRef();
  let canvas = useRef();

  let textureDim =
    Platform.OS === "ios"
      ? { width: 1920, height: 1080 }
      : { width: 1200, height: 1600 };

  useEffect(() => {
    const loadModel = async () => {
      // Uncomment the following code block for camera permissions
      // const { status } = await Camera.requestCameraPermissionsAsync();
      // if (status !== 'granted') {
      //   console.error('Camera permission not granted');
      //   return;
      // }
      await Camera.requestCameraPermissionsAsync();
      await tf.ready();
      tf.env().set('WEBGL_PACK_DEPTHWISECONV', false);
      setModel(await cocoSSd.load());
      console.log("Model loaded");
      window.location.reload();
    };

    loadModel();
  }, []);


  function handleCameraStream(images) {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (!model || !nextImageTensor)
        throw new Error("Model or image not loaded");
      model
        .detect(nextImageTensor)
        .then((predictions) => {
          drawRectangle(predictions, nextImageTensor);
        })
        .catch((err) => {
          console.log(err);
        });
      requestAnimationFrame(loop);
    };
    loop();
  }

  function drawRectangle(predictions, nextImageTensor) {
    if (!context.current || !canvas.current) return;
    const scaleWidth = width / nextImageTensor.shape[1];
    const scaleHeight = height / nextImageTensor.shape[0];

    const flipHorizontal = Platform.OS === "ios" ? false : true;

    context.current.clearRect(0, 0, width, height);

    console.log(predictions)
    for (const prediction of predictions) {
      const [x, y, width, height] = prediction.bbox;

      const boundingBoxX = flipHorizontal
        ? canvas.current.width - x * scaleWidth - width * scaleWidth
        : x * scaleWidth;
      const boundingBoxY = y * scaleHeight;

      context.current.strokeRect(
        boundingBoxX,
        boundingBoxY,
        width * scaleWidth,
        height * scaleHeight
      );

      context.current.strokeText(
        prediction.class,
        boundingBoxX - 5,
        boundingBoxY - 5
      );
    }
  }

  async function handleCanvas(can) {
    if (can) {
      can.width = width;
      can.height = height;
      const ctx = can.getContext("2d");
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.fillStyle = "red";

      context.current = ctx;
      canvas.current = can;
    }
  }

  return (
    <View style={styles.container}>
      <TensorCamera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        cameraTextureHeight={textureDim.height}
        cameraTextureWidth={textureDim.width}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
        useCustomShadersToResize={false}
      />
      <Canvas style={styles.canvas} ref={handleCanvas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  canvas: {
    position: "absolute",
    zIndex: 100000000,
    width: "100%",
    height: "100%",
  },
});
