import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center'
    },
    
    profileContainer: {
      flex: 1,
      padding: 10
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
      width: 200,
      height: 200
    }

  });

export default styles;