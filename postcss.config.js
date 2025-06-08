// Modern PostCSS configuration for react-wizardry
// Using latest PostCSS plugins and best practices for 2025

export default {
  plugins: {
    // PostCSS Preset Env with modern features
    'postcss-preset-env': {
      stage: 1, // Use stage 1 features (more stable than stage 0)
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'custom-properties': {
          preserve: true, // Keep custom properties for runtime
        },
      },
      autoprefixer: {
        flexbox: 'no-2009', // Disable old flexbox syntax
        grid: 'autoplace', // Enable CSS Grid autoprefixing
      },
      browsers: [
        'last 2 versions',
        'not op_mini all',
        'not ie <= 11',
        '> 1%',
        'not dead'
      ],
    },
    
    // Autoprefixer for vendor prefixes
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace',
      overrideBrowserslist: [
        'last 2 versions',
        'not op_mini all',
        'not ie <= 11',
        '> 1%',
        'not dead'
      ],
    },

    // CSS Nano for production minification (only in production)
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          mergeRules: true,
          minifyFontValues: true,
          minifySelectors: true,
          reduceIdents: false, // Keep animation names intact
          svgo: true,
        }],
      },
    } : {}),
  },
};
