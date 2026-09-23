import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'AI Golf Swing Coach',
  slug: 'ai-golf-swing-coach',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  ios: {
    bundleIdentifier: 'REPLACE_WITH_REAL_BUNDLE_IDENTIFIER',
    buildNumber: '1',
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription: 'AI Golf Swing Coach uses the camera to record your golf swing for analysis.',
      NSMicrophoneUsageDescription: 'AI Golf Swing Coach uses the microphone when you record a swing video.',
      NSPhotoLibraryUsageDescription: 'AI Golf Swing Coach uses photo library access so you can choose a swing video to analyze.',
    },
    // Add ios.privacyManifests only after auditing actual APIs and SDKs.
  },
};

export default config;
