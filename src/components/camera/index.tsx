import { Camera, CameraType } from 'expo-camera';
import { useContext, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { AuthContext } from '../../context/auth';
import { SimpleLineIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function Cameraprodutos() {
    const { modalCamera, setmodalCamera }: any = useContext(AuthContext);
    const [tipo, setTipo] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const cameraRef = useRef(null);

    function mudartipoCamera() {
        setTipo(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const FecharCamera = () => {
        setmodalCamera(false);
    }

    return (
        <Modal isVisible={modalCamera} style={{ width: 400, height: "100%", marginLeft: 0, marginBottom: 0, marginRight: 0}}>
            <Camera
                style={{ height: "100%", width: "95%" }}
                type={tipo}
                ref={cameraRef}
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
                    <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }} onPress={() => mudartipoCamera()}>
                        <MaterialCommunityIcons name="camera-flip-outline" size={30} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }}>
                        <SimpleLineIcons name="camera" size={30} style={styles.camera} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }} onPress={FecharCamera}>
                        <AntDesign name="closecircleo" size={30} color="white" />
                    </TouchableOpacity>
                    {capturedPhoto && <Image source={{ uri: capturedPhoto }} style={{ width: 200, height: 200 }} />}
                </View>
            </Camera>
        </Modal>
    );
}

const styles = StyleSheet.create({
    camera: {
        color: "white",
        marginTop: 15,
        marginLeft: 5,
        marginRight: 15
    },
})