export interface ImageCarouselProps {
  images: string[];
  altText?: string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  showThumbnails?: boolean;
  showNavigation?: boolean;
  aspectRatio?: string;
  borderRadius?: number;
} 