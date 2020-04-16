import transformConfig from '../node_modules/react-scripts/config/jest/babelTransform'
console.log(transformConfig)
require('@babel/register')({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: [],
  extensions: ['.ts', '.tsx'],
  presets: '@babel/preset-typescript',
})
// import App from '../src/App.tsx'
// const App = require('../src/App')

// const P: number[] = [1,41]
// console.log(App)
