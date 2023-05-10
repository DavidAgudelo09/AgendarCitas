
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState({ patientName: '', ownerName: '', symptoms: '', phone: '', email: '' });
  const [appointments, setAppointments] = useState<Array<any>>([]);

  const handleFormChange = (key: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleFormSubmit = () => {
    if (formState.patientName && formState.ownerName && formState.symptoms && formState.phone && formState.email) {
      const newAppointment = { ...formState };
      setAppointments((prevState) => [...prevState, newAppointment]);
      console.log(appointments);
      setModalVisible(false);
      setFormState({ patientName: '', ownerName: '', symptoms: '', phone: '', email: '' });
    } else {
      Alert.alert('Warning', 'Se debe completar los campos obligatorios.');
    }
  };

  const handleDeleteAppointment = (index: number) => {
    setAppointments((prevState) => {
      const updatedAppointments = [...prevState];
      updatedAppointments.splice(index, 1);
      return updatedAppointments;
    }); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        ADMIN{'\n'}
        <Text style={styles.subtitle}>Veterinaria Lopez{'\n'}</Text>
      </Text>
      <Button title="RETURN" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
        <View style={styles.BtnGuarCancerlar}>
            <Button title="Appointments" onPress={() => setModalVisible(false)} />
          </View>
        </View>
          <Text style={styles.modalTitle}>Schedule</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFormChange('patientName', value)}
            value={formState.patientName}
            placeholder="Name:"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFormChange('ownerName', value)}
            value={formState.ownerName}
            placeholder="Owner:"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFormChange('symptoms', value)}
            value={formState.symptoms}
            placeholder="Symptom:"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFormChange('email', value)}
            value={formState.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFormChange('phone', value)}
            value={formState.phone}
            placeholder="Cell phone"
            keyboardType="phone-pad"
          />
          

          <View style={styles.BtnGuarCancerlar}>
            <Button title="Register Appointment" onPress={handleFormSubmit} />
          </View>

          
      </Modal>


      <ScrollView>
        {appointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentContainer}>
            <Text>Name: {appointment.patientName}</Text>
            <Text>Cell Phone: {appointment.phone}</Text>
            <Text>Email: {appointment.email}</Text>
            <Button
              title="Delete"
              onPress={() => handleDeleteAppointment(index)}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#56C7BE',
  },
  title: {
    fontSize: 30,
    color: '#000000',
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
  newAppointmentButton: {
    backgroundColor: '#56C7BE',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 30,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    margin: 50,
   
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  BtnGuarCancerlar: {
    marginBottom: 30,
  },
  appointmentContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
});

export default App;