import { Camera, CameraType } from 'expo-camera';
import { useContext, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { AuthContext } from '../../context/auth';
import { SimpleLineIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

export default function Cameraprodutos() {
    const { modalCamera, setmodalCamera }: any = useContext(AuthContext);
    const [tipo, setTipo] = useState(CameraType.back);
    const [image, setImage] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [permissaoCamera, setPermissaoCamera] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async ()=> {
            MediaLibrary.requestPermissionsAsync();
            const  status  = await Permissions.askAsync(Permissions.CAMERA);
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setPermissaoCamera(cameraStatus.status === 'granted');
        })
    }, [])

    const alertPersonalizado = (alerta: string, mensagem: string) =>
        Alert.alert(alerta, mensagem, [
            { text: 'OK' },
        ]
    );

    function mudartipoCamera() {
        setTipo(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const FecharCamera = () => {
        setmodalCamera(false);
    }

    async function capturarFoto() {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setCapturedPhoto(data.uri);
            } catch (e) {
                console.log(e);
            }

        }
    }

    if(permissaoCamera === false){
        return <Text>Sem permissao</Text>
    }

    async function SalvarFotoGaleria(uri) {
        try {
          const asset = await MediaLibrary.createAssetAsync(uri);
          const album = await MediaLibrary.getAlbumAsync('Expo');
          if (album === null) {
            await MediaLibrary.createAlbumAsync('Expo', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
          console.log('URI salva na galeria com sucesso!');
        } catch (error) {
          console.log('Erro ao salvar a URI na galeria:', error);
        }
      }

    // async function salvarFoto() {
    //     if (capturedPhoto) {
    //         try {
    //             await MediaLibrary.createAssetAsync(capturedPhoto)
    //             alertPersonalizado("Aviso", "Foto salva!")
    //             setCapturedPhoto(null)
    //         } catch (e) {
    //             console.log(e);

    //         }
    //     }
    // }

    return (
        <Modal isVisible={modalCamera} style={{ width: 400, height: "100%", marginLeft: 0, marginBottom: 0, marginRight: 0 }}>
            {!capturedPhoto ? <Camera
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


                </View>
            </Camera> :
                <Image source={{ uri: capturedPhoto }} style={{ height: 300, width: 300, marginLeft: 45 }} />
            }

            {
                !capturedPhoto ? <View style={styles.botoes}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }} onPress={() => mudartipoCamera()}>
                        <MaterialCommunityIcons name="camera-flip-outline" size={30} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }} onPress={() => capturarFoto()}>
                        <SimpleLineIcons name="camera" size={30} style={styles.camera} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }} onPress={FecharCamera}>
                        <AntDesign name="closecircleo" size={30} color="white" />
                    </TouchableOpacity>
                </View> :

                    <View style={styles.botoes}>
                        <TouchableOpacity onPress={()=> setCapturedPhoto(null)}>
                            <Text style={{ color: 'white', fontSize: 19 }}>Nova foto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => SalvarFotoGaleria(capturedPhoto)}>
                            <Text style={{ color: 'white', fontSize: 19 }}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
            }
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
    botoes: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 80,
        marginTop: 20,
        justifyContent: "space-around",
    }
})