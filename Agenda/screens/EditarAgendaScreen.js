import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect

const EditarAgendasScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://192.168.0.15/agenda/get_notes.php');
      const data = await response.json();
      if (data.status === 'success') {
        setNotes(data.notes);
      } else {
        Alert.alert('Error al cargar las notas');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error al cargar las notas');
    }
  };

  // Llamar a fetchNotes cada vez que EditarAgendasScreen recibe el enfoque
  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, [])
  );

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setEditedTitle(note.titulo);
    setEditedContent(note.contenido);
  };

  const handleUpdateNote = async () => {
    try {
      const response = await fetch('http://192.168.0.15/agenda/editar_notas.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_note',
          id: selectedNote.id_nota,
          titulo: editedTitle,
          contenido: editedContent,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('Nota actualizada correctamente');
        fetchNotes(); // Refresh the notes list
        setSelectedNote(null); // Clear the selected note
      } else {
        Alert.alert('Error al actualizar la nota');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error al actualizar la nota');
    }
  };

  const handleDeleteNote = async () => {
    try {
      const response = await fetch('http://192.168.0.15/agenda/editar_notas.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete_note',
          id: selectedNote.id_nota,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('Nota eliminada correctamente');
        fetchNotes(); // Refresh the notes list
        setSelectedNote(null); // Clear the selected note
      } else {
        Alert.alert('Error al eliminar la nota');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error al eliminar la nota');
    }
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectNote(item)}>
      <View style={styles.noteItem}>
        <Text style={styles.noteTitle}>{item.titulo}</Text>
        <Text style={styles.noteDate}>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedNote ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={editedTitle}
            onChangeText={setEditedTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Contenido"
            value={editedContent}
            onChangeText={setEditedContent}
            multiline
          />
          <Button title="Actualizar Nota" onPress={handleUpdateNote} />
          <Button title="Eliminar Nota" onPress={handleDeleteNote} color="red" />
          <Button title="Cancelar" onPress={() => setSelectedNote(null)} color="grey" />
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id_nota.toString()}
          ListHeaderComponent={<Text style={styles.header}>¿Deseas editar alguna nota en particular?</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noteItem: {
    padding: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDate: {
    fontSize: 14,
    color: 'grey',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  editContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default EditarAgendasScreen;
