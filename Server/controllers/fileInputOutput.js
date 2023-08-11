import fs from 'fs';

export const writeFile = async (fileName, content) => {
    let base64Image = content.split(';base64,').pop();
    try{
        
        await fs.promises.writeFile(fileName, base64Image, {encoding: 'base64'});
    }catch(e){
        console.error(e);
    }
}


export const moveFile = (oldPath, newPath) => {
    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successful')
    })
}

export const getStorageFormate = (mediaType) =>{
    if(mediaType == 'image') return '.png';
    else if(mediaType == 'video') return '.mp4';
    else if(mediaType == 'audio') return '.mp3';
    else return '';
}