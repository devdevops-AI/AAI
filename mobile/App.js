import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert, TextInput, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { initDB, getItems, addOrUpdateItem } from './database';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const [qty, setQty] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    initDB().then(loadItems);
  }, []);

  const loadItems = () => {
    getItems().then(setItems);
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const name = getProductName(data);
    setCurrentItem(name);
    setModalVisible(true);
  };

  const saveItem = () => {
    const quantity = parseInt(qty, 10) || 0;
    addOrUpdateItem(currentItem, quantity).then(() => {
      setModalVisible(false);
      setQty('');
      loadItems();
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={item.quantity < 100 ? styles.low : styles.item}>
            {item.name} - {item.quantity}g
          </Text>
        )}
      />
      <Modal visible={modalVisible} transparent>
        <View style={styles.modal}> 
          <Text>{currentItem}</Text>
          <TextInput
            placeholder="Quantity (g)"
            keyboardType="numeric"
            value={qty}
            onChangeText={setQty}
            style={styles.input}
          />
          <Button title="Save" onPress={saveItem} />
        </View>
      </Modal>
    </View>
  );
}

function getProductName(barcode) {
  // Placeholder for actual product lookup
  return `Item ${barcode}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  item: { fontSize: 18, marginVertical: 4 },
  low: { fontSize: 18, marginVertical: 4, color: 'red' },
  modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffffee' },
  input: { borderWidth: 1, width: 200, padding: 8, marginVertical: 10 },
});
