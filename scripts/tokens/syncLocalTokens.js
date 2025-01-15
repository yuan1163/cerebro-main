const fs = require('fs');
const path = require('path');

function deepMerge(target, source) {
  Object.keys(source).forEach((key) => {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!(key in target)) {
        target[key] = Array.isArray(source[key]) ? [] : {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
}

function readJSONFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8').trim();
    return fileContent ? JSON.parse(fileContent) : {};
  } catch (e) {
    console.error(`Could not read file: ${filePath}`, e);
    return {};
  }
}

function processTokensForSet(theme, tokensSet) {
  const baseTokensPath = path.join(
    __dirname,
    '../../src/styles/tokens/input/baseTokens',
    theme === 'global' ? 'base/global.json' : `themes/${theme}/${theme}.json`,
  );

  if (tokensSet === 'base') {
    console.log(`No action required for base tokens set for theme "${theme}".`);
    return;
  }

  const specificTokensPath = path.join(
    __dirname,
    `../../src/styles/tokens/input/${tokensSet}Tokens`,
    theme === 'global' ? 'base/global.json' : `themes/${theme}/${theme}.json`,
  );

  try {
    const baseTokens = readJSONFile(baseTokensPath);
    const specificTokens = readJSONFile(specificTokensPath);
    const mergedTokens = deepMerge(baseTokens, specificTokens);

    fs.writeFileSync(specificTokensPath, JSON.stringify(mergedTokens, null, 2), 'utf8');
    console.log(`✨ Tokens for "${theme}" theme have been successfully merged with ${tokensSet}.`);
  } catch (error) {
    console.error(`⛔ Error processing "${theme}" theme with ${tokensSet}: ${error.message}`);
  }
}

const tokensSet = process.env.VITE_STYLE || 'base';
['light', 'dark', 'global'].forEach((theme) => {
  processTokensForSet(theme, tokensSet);
});
