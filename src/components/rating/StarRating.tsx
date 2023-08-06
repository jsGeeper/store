import React from 'react';
import { Rating } from '@mui/material';
import { useFormikContext } from 'formik';

type Name = 'simple-controlled' | 'read-only' | 'disabled' | 'no-value';
interface IStarRatingProps {
  name: Name;
  value?: number;
  size?: 'small' | 'medium' | 'large';
  isEditable?: boolean;
  [propName: string]: any;
}

const StarRating: React.FC<IStarRatingProps> = ({
  size = 'large',
  value = 0,
  name = 'read-only',
  isEditable = false,
  ...otherProps
}: IStarRatingProps) => {
  const [rating, setRating] = React.useState<number | null>(value);
  // const { setFieldValue } = useFormikContext<IStarRatingProps>();
  return (
    <Rating
      name={name}
      value={isEditable ? rating : value}
      size={size}
      {...(isEditable
        ? {
            onChange: (event, newValue) => {
              setRating(newValue);
              // setFieldValue(name, newValue);
            }
          }
        : {})}
      {...otherProps}
      sx={{ marginRight: '1rem', fontSize: '2.875rem', color: '#FEC84B' }}
    />
  );
};

export default StarRating;
