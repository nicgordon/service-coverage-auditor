module.exports = function setBabelConfig(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
