import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotaDetallesScreen = ({ route }) => {
  const { note } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.titulo}</Text>
      <Text style={styles.content}>{note.contenido}</Text>
      <Text style={styles.timestamp}>Creado: {note.createdAt}</Text>
      <Text style={styles.timestamp}>Actualizado: {note.updatedAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 14,
    color: 'gray',
  },
});

export default NotaDetallesScreen;
