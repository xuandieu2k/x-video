import { clearCache } from 'react-native-video-cache-control';
import { log } from './LogConfig';

const clearAllCache = async () => {
    try {
        await clearCache();
    } catch (error) {
        log.log(error);
    }
}

const clearSingleCache = async (url: string) => {
    try {
        await clearCache(url);
    } catch (error) {
        log.log(error);
    }
}