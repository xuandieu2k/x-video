
export const ApiBaseConfig = {
  API_URL: "https://api.pexels.com",
  API_HTTPS: 'https://',
}
export const ApiVideoRouters = {
  get API_GET_VIDEO_POPULAR() {
    return `/videos/popular`;
  },
  get API_GET_VIDEO_WITH_KEYSEARCH() {
    return `/videos/search`;
  },
}
