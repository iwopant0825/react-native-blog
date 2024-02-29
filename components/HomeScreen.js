import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BottomBar from './Bottombar'; // 바 컴포넌트를 import 합니다.
import * as FileSystem from 'expo-file-system'; // FileSystem 모듈을 import 합니다.

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]); // 상태를 설정하여 블로그 글 목록을 저장합니다.
  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번만 블로그 데이터를 불러옵니다.
  useEffect(() => {
    // CreatePostScreen에서 생성한 JSON 파일의 경로
    const fileUri = `${FileSystem.documentDirectory}blogData.json`;
    const loadPosts = async () => {
      try {
        // 파일이 존재하는지 확인
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          // 파일이 존재하면 읽어온 후 상태로 설정
          const data = await FileSystem.readAsStringAsync(fileUri);
          setPosts(JSON.parse(data));
        }
      } catch (error) {
        console.error('블로그 데이터를 불러오는 중 에러가 발생했습니다:', error);
      }
    };

    // 블로그 데이터를 불러오는 함수 호출
    loadPosts();
  }, []);

  const handlePostPress = (item) => {
    navigation.push('Detail', { post: item });
  };

  // 각 글을 렌더링하는 함수
  const renderBlogPost = ({ item }) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => handlePostPress(item)}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postMeta}>{`작성자: ${item.author} | 작성일자: ${item.date}`}</Text>
    </TouchableOpacity>
  );

  // 홈으로 가는 버튼을 눌렀을 때의 이벤트 핸들러
  const handleHomePress = () => {
    navigation.push('Home');
  };

  // 글 검색 버튼을 눌렀을 때의 이벤트 핸들러
  const handleSearchPress = () => {
    // 검색 화면으로 이동하는 로직을 추가할 수 있습니다.
  };

  // 글 생성 버튼을 눌렀을 때의 이벤트 핸들러
  const handleCreatePostPress = () => {
    navigation.push('CreatePost');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>블로그</Text>
      <FlatList
        data={posts}
        renderItem={renderBlogPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postList}
      />
      {/* 바 컴포넌트를 추가하고 각 버튼에 이벤트 핸들러를 전달합니다. */}
      <BottomBar
        onCreatePostPress={handleCreatePostPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  postList: {
    flexGrow: 1,
  },
  postContainer: {
    marginBottom: 16, 
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postMeta: {
    fontSize: 14,
    color: '#666666',
  },
});

export default HomeScreen;
