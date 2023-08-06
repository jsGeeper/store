import { Box, Stack, Typography, styled } from '@mui/material';

export const StepperFormHeader = styled(Box)({
  marginBottom: 3
});
export const StepperCardTitle = styled(Typography)({
  color: '#1D2939',
  fontWeight: 700,
  fontSize: 20
});
export const StepperCardSubtitle = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: 16
});
export const StepperFormStack = styled(Stack)({
  width: '100%',
  maxWidth: 430,
  flexDirection: 'column'
});

export const DescriptionRightText = styled(Typography)({
  fontWeight: 400,
  fontSize: 14,
  color: '#667085',
  textAlign: 'right'
});

export const FlexEndStack = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center'
});

export const StepperFormLabel = styled(Typography)({
  fontWeight: 500,
  fontSize: 14,
  color: '#344054',
  marginBottom: '10px',
  display: 'block',
  textTransform: 'capitalize'
});

export const StyledInfoTitle = styled(Typography)({
  color: '#98A2B3',
  fontWeight: 400,
  fontSize: '12px',
  textTransform: 'capitalize'
});

export const StyledInfoDesc = styled(Typography)({
  color: '#344054',
  fontWeight: 500,
  fontSize: 16
});

export const Badge = styled(Box)({
  backgroundColor: '#F3FEE7',
  padding: '2px 10px',
  borderRadius: '16px',
  margin: '10px 0'
});

export const BadgeText = styled(Typography)({
  color: '#3B7C0F',
  textAlign: 'center',
  fontWeight: 500,
  fontSize: 14,
  textTransform: 'capitalize'
});

export interface StepperFormProps {
  onNext: () => void;
}
