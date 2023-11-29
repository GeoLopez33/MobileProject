import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const [buttonColor, setButtonColor] = useState('blue');
  const [savedLists, setSavedLists] = useState([]);

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      if (items.length < 10) {
        setItems([...items, inputText]);
        setInputText('');
      } else {
        Alert.alert('Maximum Reached', 'You have reached the maximum limit of 10 buttons.');
      }
    }
  };

  const handleDeleteItem = (index) => {
    Alert.alert(
      'Delete Button',
      'Are you sure you want to delete this button?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            const updatedItems = [...items];
            updatedItems.splice(index, 1);
            setItems(updatedItems);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleRandomFood = () => {
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomMessage = items[randomIndex];
      Alert.alert('Random Food', randomMessage);
    } else {
      Alert.alert('No Food Items', 'You need to create buttons with food items first.');
    }
  };

  const handleSaveList = () => {
    if (items.length === 0) {
      Alert.alert('Empty List', 'You cannot save an empty list.');
      return;
    }

    if (savedLists.length >= 5) {
      Alert.alert('Maximum Lists Reached', 'You can only store up to 5 lists.');
      return;
    }

    // Save the current list to the saved lists
    setSavedLists([...savedLists, items]);
    Alert.alert('List Saved', 'Your list has been saved successfully.');
  };

  const handleListPress = (index) => {
    Alert.alert(
      'List Options',
      'Do you want to load or delete this list?',
      [
        {
          text: 'Load',
          onPress: () => handleLoadList(index),
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteList(index),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const handleLoadList = (index) => {
    const selectedList = savedLists[index];
    if (selectedList) {
      setItems(selectedList);
      Alert.alert('List Loaded', 'Your list has been loaded successfully.');
    } else {
      Alert.alert('List Not Found', 'The selected list could not be found.');
    }
  };

  const handleDeleteList = (index) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const updatedLists = [...savedLists];
            updatedLists.splice(index, 1);
            setSavedLists(updatedLists);
            Alert.alert('List Deleted', 'Your list has been deleted successfully.');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      'Delete All Buttons',
      'Are you sure you want to delete all currently listed buttons?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setItems([]);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderButtons = () => {
    return items.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.itemButton}
        onPress={() => handleDeleteItem(index)}
      >
        <Text style={styles.buttonText}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  const renderSavedButtons = () => {
    return savedLists.map((list, index) => (
      <TouchableOpacity
        key={index}
        style={styles.savedListButton}
        onPress={() => handleListPress(index)}
      >
        <Text style={styles.buttonText}>{index + 1}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.randomButton} onPress={handleRandomFood}>
        <Text style={[styles.buttonText, { color: 'black', backgroundColor: 'lightgreen' }]}>
          Random Food
        </Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter item"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAll}>
          <Text style={styles.buttonText}>Delete All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {items.length > 5 && (
          <View style={styles.column}>
            {renderButtons().slice(0, 5)}
          </View>
        )}
        {items.length > 5 && (
          <View style={styles.column}>
            {renderButtons().slice(5)}
          </View>
        )}
        {items.length <= 5 && (
          <View style={styles.column}>
            {renderButtons()}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.saveListButton} onPress={handleSaveList}>
        <Text style={styles.buttonText}>Save List</Text>
      </TouchableOpacity>

      <View style={styles.savedListContainer}>
        {renderSavedButtons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  randomButton: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'lightgreen', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  deleteAllButton: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    padding: 10,
    backgroundColor: 'green', // Updated to green
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  itemButton: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  saveListButton: {
    marginTop: 20,
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  savedListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  savedListButton: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
