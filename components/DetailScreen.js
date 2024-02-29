import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import * as FileSystem from 'expo-file-system';

const DetailScreen = ({ route, navigation }) => {
  // route.params에서 선택된 글의 정보를 가져옵니다.
  const { id, title, author, date, content } = route.params.post;

  const deletePost = async () => {
    try {
      // 기존 블로그 데이터 로드
      const fileUri = `${FileSystem.documentDirectory}blogData.json`;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        let data = await FileSystem.readAsStringAsync(fileUri);
        data = JSON.parse(data);
        
        // 선택된 글의 id를 가진 글을 필터링하여 삭제
        const newData = data.filter(post => post.id !== id);
        
        // 수정된 데이터를 파일에 씁니다.
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newData));
        
        // 삭제 완료를 알리는 경고창 표시
        Alert.alert('알림', '글이 삭제되었습니다.');
        
        // 홈 화면으로 이동
        navigation.push('Home');
      }
    } catch (error) {
      console.error('글을 삭제하는 중 에러가 발생했습니다:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>{`작성자: ${author} | 작성일자: ${date}`}</Text>
      <Text style={styles.content}>{content}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={deletePost}>
        <Text style={styles.buttonText}>글 삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
  },
  goBackButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#dddddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    padding: 12,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default DetailScreen;
