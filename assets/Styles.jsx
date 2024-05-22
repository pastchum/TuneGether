import { Dimensions, StyleSheet } from "react-native";

export const {phoneWidth, phoneHeight} = Dimensions.get("window");

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems:'center',
      maxWidth: phoneWidth,
      maxHeight: phoneHeight,
    },
    
    profileContainer: {
      flex: 1,
      padding: 10,
      width: "100%",
      maxWidth: phoneWidth,
      height: "100%",
      maxHeight: phoneHeight,     
      backgroundColor: "#8392ab"
    },

    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },
    
    bottomRowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    /* touchable opacity button styles */
    startChatButton: {
      padding: 20,
      backgroundColor: "burlywood",
      height: 60,
      width: "100%",
      borderRadius: 10,
      alignItems: 'center'
    },
    
    /* text styles */
    titleText: {
      fontSize: 24,
      fontWeight: 'bold'
    },

    buttonText: {
      color: 'white',
      fontSize: 16,
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

