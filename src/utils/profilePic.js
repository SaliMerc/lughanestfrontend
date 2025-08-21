
    export function cleanProfilePictureUrl (url) {
        if (!url) return null;

        if (url.includes('googleusercontent.com') && url.includes('media/https%3A')) {
            try {
                const encodedPart = url.split('/media/')[1];
                const decodedUrl = decodeURIComponent(encodedPart);
                const finalUrl = decodeURIComponent(decodedUrl);

                return finalUrl;
            } catch (error) {
                console.error('Error cleaning profile picture URL:', error);
                return url;
            }
        }

        if (url.startsWith('http://127.0.0.1:8000/media/') || ('https://lughanest-backend-apis.onrender.com/')) {
            return url;
        }

        return url;
    };