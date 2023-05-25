import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleOpenCamera = async () => {
    if (hasPermission) {
      setCameraOpen(true);
    } else {
      Alert.alert('Sem acesso à câmera');
    }
  };

  const handleCameraType = () => {
    setCameraType((prevCameraType) =>
      prevCameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
      setCameraOpen(false);
    }
  };

  const handleConfirm = () => {
    // Lógica para salvar a imagem capturada
    setCapturedPhoto(null);
  };

  const handleCancel = () => {
    setCapturedPhoto(null);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  if (cameraOpen) {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={cameraType}
          ref={(ref) => (cameraRef.current = ref)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', alignItems: 'center' }}
              onPress={handleCameraType}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>Virar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', alignItems: 'center' }}
              onPress={handleCapture}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>Capturar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', alignItems: 'center' }}
              onPress={() => setCameraOpen(false)}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  if (capturedPhoto) {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: capturedPhoto }} style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}
        >
          <TouchableOpacity onPress={handleConfirm} style={{ marginRight: 16 }}>
            <Text style={{ fontSize: 18, color: 'blue' }}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={{ fontSize: 18, color: 'red' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleOpenCamera} style={{ padding: 50 }}>
        <Text style={{ fontSize: 18 }}>Abrir Câmera</Text>
      </TouchableOpacity>
    </View>
  );
}