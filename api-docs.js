const fs = require('fs');
const path = require('path');

const filePaths = [
  {
    source: '',
    target: './docs/source/APIs/evernode-js-api.md'
  },
  {
    source: '',
    target: './docs/source/APIs/everpocket-api.md'
  }
];

const copyFileContent = (sourceFilePath, targetFilePath) => {
  if (!fs.existsSync(sourceFilePath)) {
    console.error(`Error: Source file not found at '${sourceFilePath}'`);
    return;
  }

  const content = fs.readFileSync(sourceFilePath, 'utf8');

  const targetDir = path.dirname(targetFilePath);
  if (!fs.existsSync(targetDir)) {
    console.error(`Error: Target directory not found at '${targetDir}'`);
    return;
  }

  try {
    fs.writeFileSync(targetFilePath, content, 'utf8');
    console.log(`Successfully populated '${targetFilePath}'`);
  } catch (err) {
    console.error(`Error writing to file '${targetFilePath}': ${err.message}`);
  }
};

const populateAPIDocs = () => {
  console.log('Populating API docs...');
  filePaths.forEach(({ source, target }) => {
    copyFileContent(source, target);
  });
};

populateAPIDocs();