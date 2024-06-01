import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bienvenido a Notes</Text>
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
    backgroundColor: '#FFFFFF', // Color de fondo azul claro
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
