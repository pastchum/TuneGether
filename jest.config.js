module.exports = {
    preset: 'jest-expo',
    testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-native-community|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@unimodules|unimodules|sentry-expo|native-base)"
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };