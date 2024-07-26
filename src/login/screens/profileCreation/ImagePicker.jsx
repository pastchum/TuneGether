import { launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

export const selectImage = async () => {
    return new Promise((resolve, reject) => {
        const options = {
            mediaType: 'photo',  // Ensure to set the mediaType to 'photo'
            quality: 1,
            includeBase64: false,  // No need to include base64 if not used
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                reject('User cancelled image picker');
            } else if (response.error) {
                console.error("ImagePicker Error: ", response.error);
                reject(response.error);
            } else if (response.assets && response.assets[0].uri) {
                try {
                    // Wait a small amount of time before launching the cropper
                    // This ensures the PHPickerViewController is fully dismissed
                    setTimeout(async () => {
                        const croppedImagePath = await cropImage(response.assets[0].uri);
                        console.log('Cropped image path:', croppedImagePath);
                        resolve(croppedImagePath);
                    }, 500); // Adjust delay time as needed
                } catch (error) {
                    console.error("Error cropping image: ", error);
                }
            }
        });
    });
};

const cropImage = async (url) => {
    return ImageCropPicker.openCropper({
        path: url,
        width: 300,
        height: 300,
        cropping: true,
        freeStyleCropEnabled: true,
        cropperCircleOverlay: true,
        includeBase64: true
    }).then(image => {
        console.log('Cropped image:', image.path);
        return image.path;  // Ensure to return the path
    }).catch(error => {
        console.error('Cropping failed:', error);
        throw error;  // Properly propagate errors
    });
};
