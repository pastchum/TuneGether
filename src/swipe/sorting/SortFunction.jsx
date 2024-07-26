import React, { setState } from "react";

export function sortFunction() {
    const [selectedItems, setSelectedItems] = useState([]);

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
                backdrop: styles.multiSelectBackdrop,
                selectToggle: styles.multiSelectBox,
                chipContainer: styles.multiSelectChipContainer,
                chipText: styles.multiSelectChipText,
          }}
        />
    )
}

const styles = StyleSheet.create({
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