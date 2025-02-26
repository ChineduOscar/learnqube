
const getYouTubeThumbnail = (videoUrl) => {
    let videoId;
    if (videoUrl.includes('youtu.be')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    } 
    else if (videoUrl.includes('youtube.com')) {
      videoId = videoUrl.split('v=')[1]?.split('&')[0];
    }
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return '/placeholder-image.jpg';
};

export default getYouTubeThumbnail