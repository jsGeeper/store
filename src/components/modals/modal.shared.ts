export const PopupStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 530,
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',

  '@media screen and (max-width: 1200px)': {
    width: '90%'
  }
};

export const modalStyle = {
  background: `rgba(74, 88, 120, 0.26)`,
  backdropFilter: `blur(8px)`
};
