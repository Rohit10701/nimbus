export default {
    input: 'dist-electron/main.js', // Your entry point
    output: {
      file: 'dist-electron/main.js',
      format: 'cjs',
    },
    plugins: [
      commonjs({
        // Specify the dynamic require targets
        dynamicRequireTargets: [
          './providers/address', // Ensure this path is correct
          './dist-electron/main.js',
          path.resolve(__dirname, 'providers/address'), // Use absolute path
          './**/*.js', // Add your dynamic require paths here
        ],
        // Optionally ignore dynamic requires
        ignoreDynamicRequires: false, // Set to true if you want to ignore them
      }),
    ],
  };
  