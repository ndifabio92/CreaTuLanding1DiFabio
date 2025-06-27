import React, { useState } from 'react';
import {
  Box,
  IconButton,
} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ImageCarouselProps } from '../../types/ui/carousel';

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  altText = 'Product image',
  maxWidth = 300,
  maxHeight,
  showThumbnails = true,
  showNavigation = true,
  aspectRatio = '1/1',
  borderRadius = 12,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={images[0]}
          alt={altText}
          style={{
            width: '100%',
            maxWidth: typeof maxWidth === 'number' ? maxWidth : '100%',
            height: maxHeight || 'auto',
            aspectRatio,
            objectFit: 'cover',
            borderRadius,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: showThumbnails ? 2 : 0,
        }}
      >
        <img
          src={images[currentImageIndex]}
          alt={`${altText} - Imagen ${currentImageIndex + 1}`}
          style={{
            // width: '100%',
            maxWidth: typeof maxWidth === 'number' ? maxWidth : '100%',
            height: maxHeight || 'auto',
            aspectRatio,
            objectFit: 'cover',
            borderRadius,
          }}
        />
        
        {showNavigation && (
          <>
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
                zIndex: 1,
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
                zIndex: 1,
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </>
        )}
      </Box>

      {showThumbnails && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {images.map((url, index) => (
            <Box
              key={index}
              onClick={() => handleImageClick(index)}
              sx={{
                width: 60,
                height: 60,
                cursor: 'pointer',
                border: index === currentImageIndex ? '2px solid' : '2px solid transparent',
                borderColor: 'primary.main',
                borderRadius: 1,
                overflow: 'hidden',
                opacity: index === currentImageIndex ? 1 : 0.7,
                transition: 'all 0.2s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <img
                src={url}
                alt={`${altText} - Miniatura ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ImageCarousel; 