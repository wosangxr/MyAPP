module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxRuntime: 'automatic',
          // Ensure flow type stripping is enabled so the parser
          // handles .js files with JSX correctly in the JS-only project
          disableFlowStripTypesTransform: false,
        },
      ],
    ],
  };
};
