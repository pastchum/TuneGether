import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const items = [
  { name: 'Vocals', id: 1},
  { name: 'Electric Guitar', id: 2},
  { name: 'Acoustic Guitar', id: 3},
  { name: 'Classical Guitar', id: 4 },
  { name: 'Bass', id: 5},
  { name: 'Keyboard/Piano', id: 6},
  { name: 'Drums', id: 7},
  
];

export default function PickInstrument() {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log('Selected:', selectedItems);



  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.labelText}>What instruments do you play?</Text>
        <SectionedMultiSelect
            items={items}
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

        <Button title='Next'
        color='burlywood'/>

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