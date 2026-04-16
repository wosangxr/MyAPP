const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Disable package exports resolution to fix the "Unable to resolve" errors
// where Metro incorrectly attempts to use TypeScript source files in dependencies.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
