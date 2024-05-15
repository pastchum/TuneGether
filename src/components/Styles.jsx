import { Dimensions, StyleSheet } from "react-native";

export const {phoneWidth, phoneHeight} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      width: phoneWidth,
      maxHeight: phoneHeight,
    },
    
    profileContainer: {
      flex: 1,
      padding: 10,
      width: "100%",
      maxHeight: "100%",
      backgroundColor: "#8392ab"
    },

    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
    },
    
    bottomRowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    /* touchable opacity button styles */
    startChatButton: {
      height: 60,
      width: "100%",
      fontSize: 16,
      fontWeight: 'bold'
    },
    
    /* text styles */
    titleText: {
      fontSize: 24,
      fontWeight: 'bold'
    },

    subHeader: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    
    /* image styles */
    displayPhoto: {
      width: 300,
      height: 300
    }

  });

export default styles;