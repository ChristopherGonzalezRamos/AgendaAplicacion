import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect desde @react-navigation/native
import axios from 'axios';

const RecordatoriosScreen = () => {
  const [notes, setNotes] = useState([]);

  // Utilizar useFocusEffect para ejecutar la lógica de carga de notas cada vez que la pantalla gana foco
  useFocusEffect(
    React.useCallback(() => {
      const fetchNotes = async () => {
        try {
          const response = await axios.get('http://192.168.0.15/agenda/get_notes.php');
          if (response.data.status === 'success') {
            setNotes(response.data.notes);
          } else {
            console.error('Error al obtener las notas:', response.data.message);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };

      fetchNotes();

      // Limpiar notas al salir de la pantalla (opcional)
      return () => setNotes([]);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECODARTORIOS DE ACTIVIDADES</Text>
      <ScrollView style={styles.notesContainer}>
        {notes.map((note) => (
          <View key={note.id_nota} style={styles.noteItem}>
            <Text style={styles.noteTitle}>{note.titulo}</Text>
            <Text>{note.contenido}</Text>
            <Text>{note.createdAt}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notesContainer: {
    width: '100%',
  },
  noteItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default RecordatoriosScreen;
