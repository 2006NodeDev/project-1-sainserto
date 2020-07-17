import {imageBucket} from "."

export async function saveProfilePicture(contentType: string, imageBase64Data: string, fileName:string) {

    try {
        let newImage = imageBucket.file(fileName)
        
        console.log(newImage);
        
        await newImage.save(Buffer.from(imageBase64Data, 'base64'), {
            metadata: {
                contentType//set some metadata about the new file
            }
        })
        console.log('post file save')

    } catch (e) {
        console.log(e);
        throw e

    }

}