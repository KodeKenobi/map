# MAP-W3 - Wellness Platform

A comprehensive React Native wellness platform designed to ignite the potency of women through holistic wellness, mindful coaching, and economic empowerment.

## 🌟 Features

### Core Sections
- **Wellness**: Health and wellness resources, treatments, and consultations
- **Wisdom**: Educational content and coaching services
- **Wealth**: Economic empowerment and financial wellness tools

### Key Functionality
- **User Authentication**: Secure login/signup with Supabase
- **Profile Management**: Avatar upload, profile updates, and personalization
- **Onboarding Flow**: Personalized journey setup for each section
- **Card-based Navigation**: Interactive cards for easy content discovery
- **Real-time Updates**: Dynamic content loading and state management
- **Cross-platform**: iOS and Android support via React Native

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KodeKenobi/map.git
   cd map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

## 🏗️ Project Structure

```
mapw3/
├── app/                    # App configuration and layout
├── components/            # Reusable React components
│   ├── Home.tsx          # Main home screen
│   ├── WellnessHome.tsx  # Wellness section home
│   ├── WisdomHome.tsx    # Wisdom section home
│   ├── WealthHome.tsx    # Wealth section home
│   └── ...               # Other components
├── lib/                  # Utility libraries
│   └── supabase.ts      # Supabase client configuration
├── store/                # Redux store and slices
├── assets/               # Images, fonts, and static assets
├── constants/            # App constants and colors
└── hooks/                # Custom React hooks
```

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo
- **State Management**: Redux Toolkit
- **Backend**: Supabase (Database, Authentication, Storage)
- **Styling**: Tailwind CSS (tailwind-rn)
- **Navigation**: React Navigation
- **Image Handling**: Expo ImagePicker
- **Notifications**: Expo Notifications

## 📱 App Flow

1. **Authentication**: Login/Signup with email
2. **Profile Setup**: Update profile information and upload avatar
3. **Home Onboarding**: Personalize journey preferences
4. **Section Navigation**: Access Wellness, Wisdom, and Wealth sections
5. **Section-specific Onboarding**: Complete onboarding for each section
6. **Content Discovery**: Browse cards and access resources

## 🔧 Configuration

### Supabase Setup
1. Create a Supabase project
2. Set up the following tables:
   - `profiles` (user profiles)
   - `wellness_cards`, `wisdom_cards`, `wealth_cards` (content cards)
3. Configure Row Level Security (RLS) policies
4. Set up storage buckets for avatars and images

### Database Schema
Key tables include:
- `profiles`: User information and onboarding status
- `wellness_cards`, `wisdom_cards`, `wealth_cards`: Content cards
- Storage buckets for user avatars and images

## 🚀 Deployment

### Android
```bash
npx expo build:android
```

### iOS
```bash
npx expo build:ios
```

### Web
```bash
npx expo build:web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in this repository.

## 🙏 Acknowledgments

- Built with React Native and Expo
- Powered by Supabase
- Styled with Tailwind CSS
- Icons and assets from various sources

---

**MAP-W3** - Empowering women through holistic wellness, mindful coaching, and economic empowerment.