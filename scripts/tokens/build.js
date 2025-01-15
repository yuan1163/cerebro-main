const StyleDictionaryPackage = require('style-dictionary');
const { createArray } = require('./fns');
const tinycolor = require('tinycolor2');

StyleDictionaryPackage.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${prop.value};`)
      .join('\n')}\n}`;
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher: function (prop) {
    return ['fontSize', 'spacing', 'borderRadius', 'borderWidth', 'sizing'].includes(prop.attributes.category);
  },
  transformer: function (prop) {
    return parseFloat(prop.original.value) + 'px';
  },
});

function transformLetterSpacing(value) {
  if (value.endsWith('%')) {
    const percentValue = value.slice(0, -1);
    return `${percentValue / 100}em`;
  }
  return value;
}

StyleDictionaryPackage.registerTransform({
  name: 'size/letterspacing',
  type: 'value',
  transitive: true,
  matcher: (token) => token.type === 'letterSpacing',
  transformer: (token) => transformLetterSpacing(token.value),
});

StyleDictionaryPackage.registerTransform({
  name: 'customColorTransform',
  type: 'value',
  transitive: true,
  matcher: (token) => token.type === 'color',
  transformer: (token) => tinycolor(token.value).toHslString(),
});

StyleDictionaryPackage.registerTransform({
  name: 'shadow/css',
  type: 'value',
  transitive: true,
  matcher: (token) => token.type === 'boxShadow',
  transformer: (token) => {
    const shadow = Array.isArray(token.value) ? token.value : [token.value];
    const value = shadow.map((s) => {
      const { x, y, blur, spread, color } = s;
      return `${x}px ${y}px ${blur}px ${spread}px ${tinycolor(color).toHslString()}`;
    });
    return value.join(', ');
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'typography/shorthand',
  type: 'value',
  transitive: true,
  matcher: (token) => token.type === 'typography',
  transformer: (token) => {
    const { value } = token;
    return `${value.fontWeight} ${value.fontSize}/${value.lineHeight} ${value.fontFamily}`;
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'gradientTransform',
  type: 'value',
  transitive: true,
  matcher: (token) => token.type === 'gradient',
  transformer: (token) => token.value.toString(),
});

// Color Modifiers

function resolveTokenValue(token, dictionary) {
  if (typeof token.value === 'string' && token.value.startsWith('{') && token.value.endsWith('}')) {
    const resolvedToken = dictionary.getReferences(token.value);
    return resolvedToken ? resolvedToken.value : token.value;
  }
  return token.value;
}

function transformHSL(token, dictionary) {
  const resolvedValue = resolveTokenValue(token, dictionary);
  let color = tinycolor(resolvedValue);
  const modification = token.$extensions?.['studio.tokens']?.modify;
  if (modification && modification.type === 'darken') {
    color = color.darken(parseFloat(modification.value) * 100);
  }
  if (modification && modification.type === 'lighten') {
    color = color.lighten(parseFloat(modification.value) * 100);
  }
  return color.toHslString();
}

StyleDictionaryPackage.registerTransform({
  name: 'color/hslAdjust',
  type: 'value',
  matcher: (token) => token.type === 'color' && token.$extensions,
  transformer: (token, dictionary) => transformHSL(token, dictionary),
});

function getStyleDictionaryConfig(theme) {
  return {
    source: [`./src/styles/tokens/output/${theme}.json`],
    format: {
      createArray,
    },
    platforms: {
      css: {
        transformGroup: 'css',
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'customColorTransform',
          'gradientTransform',
          'sizes/px',
          'shadow/css',
          'typography/shorthand',
          'size/letterspacing',
          'color/hslAdjust',
        ],
        buildPath: `./src/styles/`,
        files: [
          {
            destination: `${theme}.css`,
            format: 'css/variables',
            selector: theme !== 'global' ? `:root.${theme}` : ':root',
          },
        ],
      },
    },
  };
}

console.log('🎨 Tokens generation initiated...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['global', 'dark', 'light'].map(function (theme) {
  const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));
  StyleDictionary.buildPlatform('css');
});

console.log('🎨 Tokens generated!');
