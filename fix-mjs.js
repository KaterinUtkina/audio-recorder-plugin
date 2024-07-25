const fs = require('fs');
const path = require('path');

// Папка с исходными .js файлами
const directoryPath = path.join(__dirname, 'dist/esm');

// Функция для замены расширений и переименования файлов
function updateFilesInDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Не удалось прочитать папку ${directory}: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);

            // Проверяем, что это файл с расширением .js
            if (path.extname(file) === '.js') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Не удалось прочитать файл ${filePath}: ${err}`);
                        return;
                    }

                    // Заменяем все .js на .mjs в содержимом файла
                    const updatedData = data.replace(/\.js/g, '.mjs');
                    const newFilePath = path.join(directory, path.basename(file, '.js') + '.mjs');

                    // Записываем обновленное содержимое в новый файл
                    fs.writeFile(newFilePath, updatedData, 'utf8', (err) => {
                        if (err) {
                            console.error(`Не удалось записать файл ${newFilePath}: ${err}`);
                            return;
                        }

                        // Удаляем старый файл .js
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(`Не удалось удалить файл ${filePath}: ${err}`);
                            } else {
                                console.log(`Файл ${filePath} был успешно заменен на ${newFilePath}`);
                            }
                        });
                    });
                });
            }
        });
    });
}

// Запускаем скрипт
updateFilesInDirectory(directoryPath);
