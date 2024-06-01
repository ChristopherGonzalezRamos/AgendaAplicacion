import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ProfileScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [profile, setProfile] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.0.15/agenda/get_profile.php?email=${email}`);
        if (response.data.status === 'success') {
          setProfile(response.data.user);
          const storedImage = await AsyncStorage.getItem('profile_image');
          if (storedImage) {
            setSelectedImage({ uri: storedImage });
          } else {
            setSelectedImage({ uri: response.data.user.profile_image });
          }
        } else {
          Alert.alert('Error', response.data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load profile');
      }
    };

    fetchProfile();
  }, [email]);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (pickerResult.cancelled) {
      return;
    }

    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const { uri } = pickerResult.assets[0];
      setSelectedImage({ uri });
      try {
        await axios.post('http://192.168.0.15/agenda/update_profile_image.php', { email, profile_image: uri });
        await AsyncStorage.setItem('profile_image', uri);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to save image');
      }
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        {profile ? (
          <>
            <Text style={styles.texttitle}>Nombre: {profile.name}</Text>
            <Text style={styles.texttitle}>Edad: {profile.age}</Text>
            <Text style={styles.texttitle}>Ocupación: {profile.occupation}</Text>
            <Text style={styles.texttitle}>Correo: {profile.email}</Text>
            <Image
              source={{
                uri: selectedImage !== null ? selectedImage.uri : 'https://picsum.photos/200/200',
              }}
              style={styles.image}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttontext}>Seleccionar Imagen</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttontext}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text>No se encontraron detalles del perfil.</Text>
        )}
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
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  texttitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
