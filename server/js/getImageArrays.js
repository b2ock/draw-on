
const fs = require('fs');
const path = require('path');

const folderDirectory = './images';
const folders = fs.readdirSync(folderDirectory);

const foldersArray = [];
for (i=0; i<folders.length; i++){
    foldersArray.push(path.join(folderDirectory, folders[i]))
}
const imageDirectory = [];
for (x=0; x<foldersArray.length; x++){
    const images = fs.readdirSync(foldersArray[x]);
    let newArray = [];
    for (i=0; i<images.length; i++){
        newArray.push({
            src: path.join(foldersArray[x], images[i]),
            title: path.basename(images[i])
        })
    }
    imageDirectory.push(newArray);
}

exports.imageDirectory = imageDirectory;