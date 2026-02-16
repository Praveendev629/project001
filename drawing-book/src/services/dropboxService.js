import { Dropbox } from 'dropbox';

const APP_KEY = '3b2fltt1sr1ih89';
const APP_SECRET = '3run92qh2bhdgtm';
const REFRESH_TOKEN = 'PGPISHoapIsAAAAAAAAAAc_Fy6Pu8zr7yMo73Tn19C_5Kg4606qv3BbGzulByGWE';

const dbx = new Dropbox({
    clientId: APP_KEY,
    clientSecret: APP_SECRET,
    refreshToken: REFRESH_TOKEN,
});

export const listImagesFromDropbox = async () => {
    try {
        const response = await dbx.filesListFolder({ path: '' });
        // Filter only images and map to useful structure
        const files = response.result.entries.filter(
            (entry) => entry['.tag'] === 'file' && entry.name.match(/\.(jpeg|jpg|gif|png)$/i)
        );

        // Get temporary links for all images to display them
        const imagesWithLinks = await Promise.all(files.map(async (file) => {
            const linkResponse = await dbx.filesGetTemporaryLink({ path: file.path_lower });
            return {
                id: file.id,
                name: file.name,
                path: file.path_lower,
                link: linkResponse.result.link,
                rev: file.rev
            };
        }));

        return imagesWithLinks;
    } catch (error) {
        console.error('Error listing images:', error);
        throw error;
    }
};

export const uploadImageToDropbox = async (file, customName) => {
    try {
        // Ensure extension is correct
        const extension = file.name.split('.').pop();
        const fileName = `${customName}.${extension}`;

        const response = await dbx.filesUpload({
            path: '/' + fileName,
            contents: file,
            mode: 'add', // or 'overwrite'
            autorename: true
        });
        return response.result;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const deleteImageFromDropbox = async (path) => {
    try {
        const response = await dbx.filesDeleteV2({ path });
        return response.result;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};
