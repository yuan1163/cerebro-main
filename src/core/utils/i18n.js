const fs = require('fs').promises;
const path = require('path');
const _ = require('lodash');

const regex = /t\s*\(\s*(['"])([^'"]+)\1\s*,\s*(['"])([^'"]+)\3\s*,\s*(['"])([^'"]+)\5\s*\)/g;
const directoryPath = './src'; // Change this to the path of your src folder
const outputFilePath = './src/core/utils/translations/en.json'; // Change this to the path of your output file

async function executeForAllFilesInDirectory(directoryPath, processFile) {
  try {
    const files = await fs.readdir(directoryPath);
    const filePromises = [];

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
        filePromises.push(processFile(filePath));
      } else if (stats.isDirectory()) {
        filePromises.push(executeForAllFilesInDirectory(filePath, processFile));
      }
    }

    await Promise.all(filePromises);
  } catch (err) {
    console.error(`Error reading directory: ${directoryPath}`);
  }
}

async function findOccurrencesInFile(fileName, pattern, processOccurrence) {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    const matches = data.match(pattern);

    if (matches) {
      matches.forEach((match) => processOccurrence(match));
    }
  } catch (err) {
    console.error(`Error reading the file: ${err.message}`);
  }
}

function parseTFunctionParameters(matchedString, pattern, processParameters) {
  let matches;
  while ((matches = pattern.exec(matchedString)) !== null) {
    const key = matches[2];
    const defaultValue = matches[4];
    const description = matches[6];
    processParameters(key, defaultValue, description);
  }
}

async function saveObjectToJsonFile(object, fileName) {
  try {
    const data = JSON.stringify(object, null, 2); // The null and 2 arguments format the JSON for readability.
    await fs.writeFile(fileName, data, 'utf-8');
    console.log(`Object saved to ${fileName}`);
  } catch (err) {
    console.error(`Error saving object to JSON file: ${err.message}`);
  }
}

function generate(directory, output) {
  const result = {};

  executeForAllFilesInDirectory(directory, (fileName) =>
    findOccurrencesInFile(fileName, regex, (match) =>
      parseTFunctionParameters(match, regex, (key, defaultValue, description) => {
        _.set(result, key, { translation: defaultValue, notes: description });
      }),
    ),
  ).then(() => {
    saveObjectToJsonFile(result, output);
  });
}

generate(directoryPath, outputFilePath);
