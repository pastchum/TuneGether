import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Styles } from "../../../../../assets/Styles";
import { instruments } from "./Instruments";

export const instrumentPicker = (fn) => {
    const [input, setInput] = useState('');
    const [selected, setSelected] = useState([]);

    const toggleSelection = (instrument) => {
        setSelected(previousSelection => {
            const selection = previousSelection.includes(instrument.instrumentId);
            const newSelection = selection 
                ? previousSelection.filter(id => id !== instrument.instrumentId)
                :[...previousSelection, instrument.instrumentId];
            fn(newSelection);
            return newSelection;
        });
    }
    
    const instrumentList = instruments.filter(instrument => instrument.instrumentName
                                                                    .toLowerCase()
                                                                    .includes(input.toLowerCase()));

    return (
        <View style={Styles.selectedContainer}>
            <TextInput
                style={Styles.input}
                placeholder="Search Instruments..."
                onChangeText={setInput}
                value={input}
            />
            <FlatList
                style={Styles.dropdownContainer}
                data={instrumentList}
                keyExtractor={(item) => item.instrumentId}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                toggleSelection(item);
                            }}
                        >
                            <Text style={Styles.buttonText}>
                                {item ? 
                                    item.instrumentName
                                    : "No instruments found"
                                }
                            </Text>
                        </TouchableOpacity>
                        );
                    }}
            />
            <View style={Styles.startChatButton}>
                {selected.map(id => (
                    <View key={id} >
                        <Text style={Styles.selectedText}>
                            {instruments.find(i => i.instrumentId === id).instrumentName}
                        </Text>
                    </View>
                    ))
                }
            </View>
        </View>
    );
};

  