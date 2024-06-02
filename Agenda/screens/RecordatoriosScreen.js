import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';

const RecordatoriosScreen = () => {
  const [notes, setNotes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotes = async () => {
        try {
          const response = await axios.get('http://192.168.0.15/agenda/get_notes.php');
          if (response.data.status === 'success') {
            const today = moment().startOf('day');
            const threeDaysFromNow = moment().add(3, 'days').endOf('day');
            
            // Verificar las fechas de las notas
            console.log('Notas obtenidas:', response.data.notes);

            const filteredNotes = response.data.notes.filter(note => {
              const noteDate = moment(note.createdAt);
              console.log('Fecha de la nota:', note.createdAt, 'Fecha parseada:', noteDate.format());

              return noteDate.isBetween(today, threeDaysFromNow, null, '[]');
            });

            console.log('Notas filtradas:', filteredNotes);
            setNotes(filteredNotes);
          } else {
            console.error('Error al obtener las notas:', response.data.message);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };

      fetchNotes();

      return () => setNotes([]);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECORDATORIOS DE ACTIVIDADES</Text>
      <ScrollView style={styles.notesContainer}>
        {notes.map((note) => (
          <View key={note.id_nota} style={styles.noteItem}>
            <Text style={styles.noteTitle}>{note.titulo}</Text>
            <Text>{note.contenido}</Text>
            <Text>{moment(note.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
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
