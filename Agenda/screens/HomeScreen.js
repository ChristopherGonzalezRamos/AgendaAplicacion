import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://cdn-icons-png.freepik.com/512/7996/7996558.png' }}
            style={styles.image}
          />
          <Text style={styles.title}>Bienvenido a Notes</Text>
        </View>
        <Text style={styles.subtitle}>
          La aplicación que te ayudará a organizar mejor tus actividades diarias.
        </Text>
        <Text style={styles.content}>
          El objetivo de esta herramienta es organizar mejor al usuario en sus actividades, 
          de manera que no haya pretextos en no llevarlas a cabo.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginHorizontal: 16,
  },
});

export default HomeScreen;
