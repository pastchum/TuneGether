import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { instruments } from "../../../assets/instruments/Instruments";

export function FilterFunction({ setFilterCondition, filterCondtion}) {
    console.log("Filter running");
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
      setFilterCondition(selectedItems);
    }, [selectedItems, setFilterCondition]);

    return (
        <SectionedMultiSelect
            items={instruments}
            IconRenderer={Icon}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedItems}
            selectedItems={selectedItems}
            selectText="Choose instruments to filter..."
            searchPlaceholderText="Search instruments..."
            modalAnimationType="slide"
            colors={{primary: 'burlywood'}}
            styles={{
                container: styles.container,
                backdrop: styles.multiSelectBackdrop,
                selectToggle: styles.multiSelectBox,
                chipContainer: styles.multiSelectChipContainer,
                chipText: styles.multiSelectChipText,
          }}
        />
    )
}

export function containsInstruments(instrumentsArray, filterArray) {
  if (!filterArray || filterArray.length === 0) {
    console.log("no filter")
    return true;
  }

  return filterArray.every(filterItem => instrumentsArray.includes(filterItem));
}

const styles = StyleSheet.create({
    container: {
      height: "80%"
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