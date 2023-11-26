import React from "react";
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
} from "react-native";

const ExpCard = ({ _id, category, name, handlePress = (f) => f }) => {
   //console.log(props);
   const cardWidth = Dimensions.get("window").width / 2;

   return (
      <View style={styles.container}>
         <View style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.text}>Name: {name}</Text>
            <Text style={styles.text}>Category: {category}</Text>
            <TouchableOpacity
               style={styles.container2}
               onPress={() => handlePress(_id)}
            >
               <Text
                  style={{ fontWeight: "bold", fontSize: 14, color: "blue" }}
               >
                  Delete
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
      paddingHorizontal: 20,
   },
   card: {
      backgroundColor: "lightblue",
      padding: 20,
      marginVertical: 8,
      alignItems: "center",
      borderRadius: 10,
   },
   text: {
      fontSize: 17,
   },
});

export default ExpCard;
