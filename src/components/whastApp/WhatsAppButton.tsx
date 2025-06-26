// components/WhatsAppButton.tsx
import React from 'react';
import { Button, IconButton, Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { openWhatsAppWithMessage, sendWhatsAppMessage } from '../../shared/whatsappUtils';


interface WhatsAppButtonProps {
  phoneNumber?: string;
  message: string;
  variant?: 'button' | 'icon' | 'fab';
  useWeb?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
  variant = 'button',
  useWeb = true,
  children,
  className,
  style,
  disabled
}) => {
  const handleClick = () => {
    if (phoneNumber) {
      sendWhatsAppMessage(phoneNumber, message, useWeb);
    } else {
      openWhatsAppWithMessage(message);
    }
  };

  const defaultStyle = {
    backgroundColor: '#25D366',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1da851',
    },
    ...style
  };

  switch (variant) {
    case 'icon':
      return (
        <IconButton
          onClick={handleClick}
          sx={defaultStyle}
          className={className}
          aria-label="Enviar por WhatsApp"
        >
          <WhatsAppIcon />
        </IconButton>
      );
      
    case 'fab':
      return (
        <Fab
          onClick={handleClick}
          sx={defaultStyle}
          className={className}
          aria-label="Enviar por WhatsApp"
        >
          <WhatsAppIcon />
        </Fab>
      );
      
    default:
      return (
        <Button
          onClick={handleClick}
          startIcon={<WhatsAppIcon />}
          sx={defaultStyle}
          className={className}
          variant="contained"
          disabled={disabled}
        >
          {children || 'Enviar por WhatsApp'}
        </Button>
      );
  }
};

export default WhatsAppButton;