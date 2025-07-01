import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('grocery.db');

export const initDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS groceries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, quantity INTEGER);', [],
        () => resolve(), (_, error) => reject(error));
    });
  });
};

export const getItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM groceries;', [],
        (_, result) => resolve(result.rows._array), (_, error) => reject(error));
    });
  });
};

export const addOrUpdateItem = (name, qty) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO groceries (name, quantity) VALUES (?, ?) ON CONFLICT(name) DO UPDATE SET quantity = quantity + excluded.quantity;', [name, qty],
        (_, result) => resolve(result), (_, error) => reject(error));
    });
  });
};

export const updateQuantity = (id, qty) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE groceries SET quantity = ? WHERE id = ?;', [qty, id],
        (_, result) => resolve(result), (_, error) => reject(error));
    });
  });
};

export default db;
