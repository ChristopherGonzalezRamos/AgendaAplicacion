import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import 'moment-weekday-calc';
import { useFocusEffect } from '@react-navigation/native';

const AgendaScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));
  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'));

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
      console.error('Error fetching notes:', error);
      Alert.alert('Error al cargar las notas');
    }
  };

  // Llamar a fetchNotes cada vez que AgendaScreen recibe el enfoque
  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, [])
  );
  
  const handleAddNote = async () => {
    const newNote = { title: newTitle, content: newContent, date: selectedDate.format('YYYY-MM-DD') };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);

    // Llamar a la función para crear la nota en el servidor
    await createNoteOnServer();
  };

  const createNoteOnServer = async () => {
    try {
      const response = await fetch('http://192.168.0.15/agenda/notas.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Cambiar el tipo de contenido
        },
        body: new URLSearchParams({ // Utilizar URLSearchParams para serializar los datos del formulario
          action: 'create_note',
          titulo: newTitle,
          contenido: newContent,
        }),
      });
      
      console.log(response.data); // Añade esta línea

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error al crear la nota:', error);
    }
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(prevWeek => prevWeek.clone().subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => prevWeek.clone().add(1, 'week'));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getWeekDays = (weekStart) => {
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push(weekStart.clone().add(i, 'days'));
    }
    return days;
  };

  const filteredNotes = notes.filter(note => note.date === selectedDate.format('YYYY-MM-DD'));

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <TouchableOpacity onPress={handlePreviousWeek} style={styles.arrowButton}>
            <Icon name="chevron-left" size={24} />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {getWeekDays(currentWeek).map(day => (
              <TouchableOpacity key={day.format('YYYY-MM-DD')} onPress={() => handleDateSelect(day)}>
                <View style={[
                  styles.dayContainer,
                  day.isSame(selectedDate, 'day') && styles.selectedDayContainer
                ]}>
                  <Text style={styles.dayText}>{day.format('ddd')}</Text>
                  <Text style={styles.dateText}>{day.format('D')}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleNextWeek} style={styles.arrowButton}>
            <Icon name="chevron-right" size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.selectedDateText}>{selectedDate.format('MMMM Do YYYY')}</Text>

        {isAdding ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Contenido"
              value={newContent}
              onChangeText={setNewContent}
            />
            <Button title="Crear" onPress={handleAddNote} />
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsAdding(true)} style={styles.addButton}>
            <Icon name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>Añadir Nota</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Color de fondo azul claro
  },
  container: {
    flex: 1,
    padding: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 8, // Adjust margin to space out the days
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  selectedDayContainer: {
    backgroundColor: '#6200EE',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    marginLeft: 8
,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  note: {
    backgroundColor: '#C2C2C2',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  arrowButton: {
    paddingHorizontal: 10,
  },
});

export default AgendaScreen;
