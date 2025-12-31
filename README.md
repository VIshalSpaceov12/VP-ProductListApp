# VP-ProductListApp
A React Native product listing app with search, sort, and multi-select delete functionality.

## Features
- Product listing with image, title, description, tags, and price
- Search by title or tags (min 3 characters)
- Sort by price (ascending/descending)
- Multi-select with long press to enable selection mode
- Bulk delete selected products
- Responsive layout (1 column portrait, 2 columns landscape)

## Run the App
```sh
# Install dependencies
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

## Project Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── hooks/          # Custom hooks
├── theme/          # Colors, fonts, spacing
├── types/          # TypeScript types
├── utils/          # Utility functions
├── data/           # JSON data
└── assets/         # Images and icons
```
