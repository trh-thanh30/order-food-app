module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: process.env.NODE_ENV === 'test' ? [] : ['nativewind/babel'],
  env: {
    test: {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [],
    },
  },
};
