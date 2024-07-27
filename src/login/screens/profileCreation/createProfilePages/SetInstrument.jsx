import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Styles } from '../../../../../assets/Styles';
import { instruments } from '../../../../../assets/instruments/Instruments';

export default function SetInstrument( { navigation, route }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const { name, profilePicURL, invalidInstrument } = route?.params || {};
  console.log('Selected:', selectedItems);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.labelText}>What instruments do you play?</Text>
        <SectionedMultiSelect
            items={instruments}
            IconRenderer={Icon}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedItems}
            selectedItems={selectedItems}
            selectText="Choose some instruments..."
            searchPlaceholderText="Search instruments..."
            modalAnimationType="slide"
            colors={{primary: 'burlywood'}}
            styles={{
                backdrop: styles.multiSelectBackdrop,
                selectToggle: styles.multiSelectBox,
                chipContainer: styles.multiSelectChipContainer,
                chipText: styles.multiSelectChipText,
              }}
        />
      </View>
      <View>
        {invalidInstrument && <Text style={Styles.errorText}>You must select an instrument</Text>}
      </View>
      <TouchableOpacity 
        onPress={() => {
          if (selectedItems.length > 0) {
            console.log(profilePicURL);
            return navigation.navigate("SetBio", { name: name, profilePicURL: profilePicURL, instrument: selectedItems });
          } else {
            return navigation.navigate("SetInstrument", { name: name, profilePicURL: profilePicURL, invalidInstrument:false })
          }
        }}>
        <View style={Styles.startChatButton}>
          <Text style={Styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  labelText: {
    fontFamily: 'Lora-Italic-VariableFont', 
    fontSize: 16,
    marginBottom: 8,
  },
  multiSelectBackdrop: {
    backgroundColor: 'rgba(255, 183, 0, 0.2)',
  },
  multiSelectBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#bbb',
    padding: 12,
    marginBottom: 12
  },
  multiSelectChipContainer: {
    borderWidth: 0,
    backgroundColor: 'burlywood',
    borderRadius: 8
  },
  multiSelectChipText: {
    color: '#222',
    fontSize: 14.5
  },
});