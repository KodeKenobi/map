const { withAndroidManifest } = require("@expo/config-plugins");

const withCustomIcon = (config) => {
  return withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;

    // Ensure the app icon is properly configured
    if (androidManifest.application && androidManifest.application[0]) {
      const application = androidManifest.application[0];
      if (application.activity && application.activity[0]) {
        const activity = application.activity[0];
        if (!activity.$["android:icon"]) {
          activity.$["android:icon"] = "@mipmap/ic_launcher";
        }
        if (!activity.$["android:roundIcon"]) {
          activity.$["android:roundIcon"] = "@mipmap/ic_launcher_round";
        }
      }
    }

    return config;
  });
};

module.exports = withCustomIcon;
