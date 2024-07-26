const fs = require('fs');
const path = require('path');

// Directory containing the source .js files
const directoryPath = path.join(__dirname, 'lib/dist/esm');

// Function to replace extensions and rename files
function updateFilesInDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Failed to read directory ${directory}: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);

            // Check if the file has a .js extension
            if (path.extname(file) === '.js') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Failed to read file ${filePath}: ${err}`);
                        return;
                    }

                    // Replace all .js with .mjs in the file content
                    const updatedData = data.replace(/\.js/g, '.mjs');
                    const newFilePath = path.join(directory, path.basename(file, '.js') + '.mjs');

                    // Write the updated content to the new file
                    fs.writeFile(newFilePath, updatedData, 'utf8', (err) => {
                        if (err) {
                            console.error(`Failed to write file ${newFilePath}: ${err}`);
                            return;
                        }

                        // Delete the old .js file
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(`Failed to delete file ${filePath}: ${err}`);
                            } else {
                                console.log(`File ${filePath} was successfully replaced with ${newFilePath}`);
                            }
                        });
                    });
                });
            }
        });
    });
}

// Run the script
updateFilesInDirectory(directoryPath);
