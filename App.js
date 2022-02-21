import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';



export default function App() {
  const [paino, setPaino] = useState('');
  const [bottles, setBottles] = useState(1);
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState('male');
  const [alevel, setAlevel] = useState(0);

  const bottles_array = Array.from(Array(13).keys()).splice(1);
  const time_array = Array.from(Array(11).keys()).splice(1);

  const genders = Array();
  genders.push({label: 'Male', value: 'male' });
  genders.push({label: 'Female', value: 'female' });

  function calculate() {
    let tulos = 0;
    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = paino / 10;
    let gramsleft = grams - (burning * time);

    if (gender === 'male') {
      tulos = (gramsleft / (paino * 0.7));
    } else {
      tulos = (gramsleft / (paino * 0.6));
    }
    if (tulos < 0) {
      tulos = 0;
    }
    setAlevel(tulos);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alcometer</Text>

      <Text style={styles.label}>Weight</Text>
        <View style={styles.field}>

        <TextInput 
          style={styles.input}
          value={paino.toString()}
          onChangeText={text => setPaino(text)}
          placeholder='in Kilograms'
          keyboardType='numeric'/></View>
          
        <Text style={styles.label}>Bottles</Text>
        <View style={styles.field}> <Picker 
            onValueChange={(itemValue) => setBottles(itemValue)}
            selectedValue={bottles}
          >
            {bottles_array.map((bottles,index) => (
              <Picker.Item style={styles.ddtext}
                key={index} value={(index + 1).toString()} label={bottles.toString()} />
            ))
          }
        </Picker>


        </View>

        <Text style={styles.label}>Time</Text>

        <View style={styles.field}>

        <Picker 
            style={styles.dropdown}
            onValueChange={(itemValue) => setTime(itemValue)}
            selectedValue={time}
          >
            {time_array.map((time,index) => (
              <Picker.Item style={styles.ddtext}
                key={index} value={(index + 1).toString()} label={time.toString()} />
            ))
          }
        </Picker>

        </View>

        <Text style={styles.label}>Gender</Text>
        <RadioForm
          style={styles.radio}
          labelStyle={{fontSize: 17}}
          buttonSize = {30}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}}/>


      <Text style={styles.vastaus}>{alevel.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.nappi}
        onPress={calculate}>

        <Text style={styles.btext}>Calculate</Text>
      
      </TouchableOpacity>
          


        </View>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },

  title: {
    fontSize: 40,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    
  },
  
  label: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 25,
    paddingLeft: 15,
  },

  input: {
    marginLeft: 10,
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  radio: {
    paddingLeft: 10,
    paddingTop: 20,
  },
  ddtext: {
    fontSize: 20,
  },

  field: {
    margin: 10,
    borderWidth: 1,
  },

  vastaus: {
    fontSize: 50,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  }, 
  btext: {
    fontSize: 30,
    color: 'white'
  },
  nappi: {
    backgroundColor: 'green',
    alignItems: "center",
    padding: 20,
  },
  
});
