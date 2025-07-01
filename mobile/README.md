# Mobile Grocery Inventory App

This example demonstrates a simple React Native application that lets users scan grocery barcodes and track quantities locally. The project uses **Expo** for development, `expo-barcode-scanner` for reading barcodes, and `expo-sqlite` to store inventory data.

## Project Structure

```
mobile/
├── App.js            # Main application with scanning and list display
├── database.js       # SQLite helpers for storing items
└── README.md         # Documentation and future ideas
```

## Setup

1. Install [Expo CLI](https://docs.expo.dev/get-started/installation/).
2. In the `mobile` directory, run `expo install expo-barcode-scanner expo-sqlite`.
3. Start the project with `expo start`.

## Key Features

- **Barcode scanning**: Uses the device camera via `BarCodeScanner` to capture the barcode.
- **Inventory storage**: Items are stored locally in SQLite with their quantity in grams.
- **Low-stock alert**: Items below 100g appear in red in the list.
- **Manual entry/editing**: After scanning, a modal lets users enter the quantity. Items can be scanned again to add more quantity.

## Future Enhancements

- **Cloud synchronization** so multiple devices share the same inventory.
- **Product lookup service** to automatically resolve names from barcodes.
- **Image recognition** for items without barcodes.
- **Background notifications** when quantities drop below a threshold.

This code is intended as a starting point; additional error handling and UI polish are recommended for production use.
