import { useState, useEffect } from "react";

export const useImagePreloader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve anyway to not block
        img.src = url;
      });
    };

    const loadAllImages = async () => {
      try {
        await Promise.all(imageUrls.map((url) => loadImage(url)));
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error("Error preloading images:", error);
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };

    loadAllImages();

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return imagesLoaded;
};
