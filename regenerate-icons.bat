@echo off
echo 🔄 Regenerating Android app icons...

REM Check if faviconBig.png exists
if not exist "assets\images\faviconBig.png" (
    echo ❌ Error: faviconBig.png not found in assets/images/
    pause
    exit /b 1
)

echo ✅ Found faviconBig.png

REM Clean existing Android icon files
echo 🧹 Cleaning existing Android icon files...
rmdir /s /q android\app\src\main\res\mipmap-hdpi
rmdir /s /q android\app\src\main\res\mipmap-mdpi
rmdir /s /q android\app\src\main\res\mipmap-xhdpi
rmdir /s /q android\app\src\main\res\mipmap-xxhdpi
rmdir /s /q android\app\src\main\res\mipmap-xxxhdpi
rmdir /s /q android\app\src\main\res\drawable-hdpi
rmdir /s /q android\app\src\main\res\drawable-mdpi
rmdir /s /q android\app\src\main\res\drawable-xhdpi
rmdir /s /q android\app\src\main\res\drawable-xxhdpi
rmdir /s /q android\app\src\main\res\drawable-xxxhdpi

REM Prebuild to regenerate icons
echo 🔨 Running Expo prebuild to regenerate icons...
npx expo prebuild --platform android --clean

echo ✅ Android icons regenerated successfully!
echo 📱 Your custom faviconBig.png should now be used as the app icon
echo.
echo Next steps:
echo 1. Build your app: npx expo run:android
echo 2. Or create a new build: eas build --platform android
echo.
echo The app icon should now show your custom faviconBig.png instead of the stock icon!
pause
