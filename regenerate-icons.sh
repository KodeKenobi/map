#!/bin/bash

# Script to regenerate Android app icons from faviconBig.png
# This ensures your custom icon is properly used instead of stock icons

echo "🔄 Regenerating Android app icons..."

# Check if faviconBig.png exists
if [ ! -f "assets/images/faviconBig.png" ]; then
    echo "❌ Error: faviconBig.png not found in assets/images/"
    exit 1
fi

echo "✅ Found faviconBig.png"

# Clean existing Android icon files
echo "🧹 Cleaning existing Android icon files..."
rm -rf android/app/src/main/res/mipmap-*/
rm -rf android/app/src/main/res/drawable-*/

# Prebuild to regenerate icons
echo "🔨 Running Expo prebuild to regenerate icons..."
npx expo prebuild --platform android --clean

echo "✅ Android icons regenerated successfully!"
echo "📱 Your custom faviconBig.png should now be used as the app icon"
echo ""
echo "Next steps:"
echo "1. Build your app: npx expo run:android"
echo "2. Or create a new build: eas build --platform android"
echo ""
echo "The app icon should now show your custom faviconBig.png instead of the stock icon!"
