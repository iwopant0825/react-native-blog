import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    // 새로운 글을 생성하는 로직을 추가할 수 있습니다.
    console.log('새로운 글 생성:', { title, content });
    
    const fileUri = `${FileSystem.documentDirectory}blogData.json`;
  
    try {
      // 파일 존재 여부 확인
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
  
      // 파일이 없는 경우 새로 생성
      if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
      }
  
      // 기존 데이터 가져오기
      const existingData = JSON.parse(await FileSystem.readAsStringAsync(fileUri));
      const newId = existingData.length > 0 ? (existingData[existingData.length - 1].id + 1).toString() : 1; // 새로운 ID 생성
  
      const newPost = {
        id: newId,
        title: title,
        author: '사용자', // 예시로 고정된 값
        date: new Date().toISOString().split('T')[0], // 현재 날짜로 설정
        content: content,
      };
  
      // 새로운 글 추가
      const newData = [...existingData, newPost];
  
      // JSON 파일로 저장
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newData));
      console.log('새로운 글이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('글 생성 중 오류가 발생했습니다:', error);
    }
    const savedData = JSON.parse(await FileSystem.readAsStringAsync(fileUri));
    console.log('저장된 데이터:', savedData);
    // 홈 화면으로 돌아갑니다.
    navigation.push('Home');
  };

  const handleDeleteAllData = async () => {
    const fileUri = `${FileSystem.documentDirectory}blogData.json`;
    navigation.push('Home');
    try {
      await FileSystem.deleteAsync(fileUri);
      console.log('모든 데이터가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('데이터 삭제 중 에러가 발생했습니다:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>제목:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="제목을 입력하세요"
      />
      <Text style={styles.label}>내용:</Text>
      <TextInput
        style={[styles.input, styles.contentInput]}
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        placeholder="내용을 입력하세요"
      />
     <TouchableOpacity style={styles.submitButton} onPress={handleCreatePost}>
        <Text style={styles.submitButtonText}>글 생성</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.submitButton} onPress={handleDeleteAllData}>
        <Text style={styles.submitButtonText}>모든 데이터 삭제</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  contentInput: {
    height: 200, // 내용 입력창의 높이를 조절합니다.
  },
  submitButton:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'tomato',
    marginBottom:10
  },
  submitButtonText:{
    textAlign:'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default CreatePostScreen;
