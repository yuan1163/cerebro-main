const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'tokensConfig.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

function transformTokens(type) {
  config.themes.forEach((theme) => {
    const inputPathSuffix =
      theme === 'global' ? 'base/global.json' : `themes/${theme}/${theme}.json`;
    const inputPath = path.join(config.paths[type], inputPathSuffix);
    const outputPath = path.join(config.paths.output, `${theme}.json`);
    const options = config.options[theme] || '';
    const command = `npx token-transformer ${inputPath} ${outputPath} ${options}`;

    console.log(`Transforming ${type} ${theme} tokens...`);
    try {
      console.log(`Executing command: ${command}`);
      execSync(command, { stdio: 'inherit' });
    } catch (error) {
      console.error(`Error transforming ${type} ${theme} tokens: ${error}`);
    }
  });

  console.log(`${type} tokens transformation completed.`);
}

const type = process.argv[2];

transformTokens(type);
