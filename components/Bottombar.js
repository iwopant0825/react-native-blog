import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BottomBar = ({onCreatePostPress}) => {
  return (
    <View style={styles.container}>   
      <TouchableOpacity style={styles.button} onPress={onCreatePostPress}>
        <Text style={styles.buttonText}>글 생성</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingVertical: 10,
  },
  button: {
    width:150,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'tomato',
  },
  buttonText: {
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default BottomBar;
