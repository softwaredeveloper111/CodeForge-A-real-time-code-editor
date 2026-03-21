import ImageKit from '@imagekit/nodejs';
import {toFile} from '@imagekit/nodejs'



const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});




async function uploadFileToImageKIT(buffer){
try {
   const response =  await client.files.upload({
  file: await toFile(Buffer.from(buffer), 'file'),
  fileName: 'fileName',
  folder:"codeForge"
});
return response
} catch (error) {
  return error
}
}




export default uploadFileToImageKIT