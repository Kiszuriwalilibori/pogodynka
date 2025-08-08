const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// Paths to the files we'll be working with
const packageJsonPath = path.join(__dirname, '../package.json');
const indexPath = path.join(__dirname, '../public/index.html');

// Read initial version from package.json
const readVersion = () => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
};

// Update version in index.html
const updateVersionInIndex = (version) => {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  // Replace the version meta tag
  indexHtml = indexHtml.replace(/<meta name="version" content="[^\"]*" \/>/, '<meta name="version" content="' + version + '" />');
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Updated version in index.html to ' + version);
};

// Update version immediately on start
const currentVersion = readVersion();
updateVersionInIndex(currentVersion);

// Watch for changes in package.json
const watcher = chokidar.watch(packageJsonPath);
watcher.on('change', () => {
  const newVersion = readVersion();
  updateVersionInIndex(newVersion);
});

// Handle process termination to clean up watcher
process.on('SIGINT', () => {
  watcher.close();
  process.exit();
});

console.log('Version updater is running...');
