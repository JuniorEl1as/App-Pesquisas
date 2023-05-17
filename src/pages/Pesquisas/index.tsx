import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import Header from '../../components'
import { Picker } from '@react-native-picker/picker';
import CardPesquisas from '../../components/card-Pesquisas';


export default function Pesquisas() {

    const [selectedValue, setSelectedValue] = useState('');

    return (
        <SafeAreaView>
            <View>
                <Header text="Pesquisas" />
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(value: string) => setSelectedValue(value)}
                >
                    <Picker.Item key={1} label="RX Marca" value="RX Marca" />
                    <Picker.Item key={2} label="OTC Genéricos" value="Genéricos" />
                    <Picker.Item key={3} label="OTC Infantil" value="Infantil" />
                </Picker>

                <ScrollView style={{ height: 500 }}>
                    <CardPesquisas />
                    <CardPesquisas />
                    <CardPesquisas />
                    <CardPesquisas />
                    <CardPesquisas />
                    <CardPesquisas />
                    <CardPesquisas />
                    <CardPesquisas />
                    <CardPesquisas />
                    <CardPesquisas />
                </ScrollView>

            </View>
        </SafeAreaView>

    )
}
