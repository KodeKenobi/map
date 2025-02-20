# MapW3

A modern web application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Architecture:** App Router (Next.js 13+)

## 📁 Project Structure

```
├── app/
│   └── _layout.tsx       # Root layout component

├── assets/
│   └── images/

├── components/
│   ├── Home.tsx

└── tailwind.config.js    # Tailwind CSS configuration
```

## 🛠️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ProcoderSA/mapw3.git
   cd mapw3
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npx expo start -c
   # or
   eas build --profile development --platform android
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.js`. The project supports styling for the following file types:

- JavaScript (.js)
- TypeScript (.ts)
- JSX (.jsx)
- TSX (.tsx)
- MDX (.mdx)

## 📦 Components

### Layout

- `_layout.tsx`: Root layout component that wraps the entire application

### Main Components

- `WealthHome.tsx`: Main component for wealth management interface
- `LogoCard.tsx`: Component for displaying individual logos
- `BrandsComponent.tsx`: Component for displaying brand information
- `QuickAccessCardComponent.tsx`: Component for quick access cards
- `WisdomHome.tsx`: Main component for wisdom-related features
- `HomeCardComponent.tsx`: Component for displaying home cards
- `WealthOnboarding.tsx`: Component for onboarding in wealth management
- `Notifications.tsx`: Component for displaying notifications
- `ProfileComponent.tsx`: Component for user profile
- `CheckboxComponent.tsx`: Component for checkbox functionality
- `BottomCTASection.tsx`: Component for the bottom call-to-action section
- `HorizontalCardScroll.tsx`: Component for horizontal scrolling of cards
- `LogoCardScroll.tsx`: Component for scrolling logo cards
- `CoachingPicksCards.tsx`: Component for displaying coaching picks
- `HorizontalQuickAccessCardScroll.tsx`: Component for horizontal quick access cards
- `RecommendationsCard.tsx`: Component for displaying recommendations
- `ButtonComponent.tsx`: Reusable button component
- `SearchComponent.tsx`: Component for search functionality
- `Referrals.tsx`: Component for displaying referral information
- `ConsultScreen.tsx`: Component for consultation features
- `ResetPasswordComponent.tsx`: Component for resetting passwords
- `OTPCodeComponent.tsx`: Component for OTP code input
- `CoachingCardComponent.tsx`: Component for coaching cards
- `WisdomNavMenu.tsx`: Navigation menu for wisdom features
- `WealthNavMenu.tsx`: Navigation menu for wealth features
- `BottomNav.tsx`: Bottom navigation component

## Configuration

### Tailwind CSS

The project uses a standard Tailwind CSS configuration with content paths set up for both the `app` and `components` directories.

```javascript
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

[Add your license information here]

## 👥 Authors

[Add author information here]

## 🙏 Acknowledgments

[Add any acknowledgments here]
