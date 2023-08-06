import React from 'react';

interface ITeamIconProps {
  isActive?: boolean;
}

const TeamIcon: React.FC<ITeamIconProps> = ({ isActive }: ITeamIconProps) => {
  const color = isActive ? '#027A48' : '#667085';
  const fill = isActive ? '#027A48' : 'transparent';

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.9695 14.4402C18.3395 14.6702 19.8495 14.4302 20.9095 13.7202C22.3195 12.7802 22.3195 11.2402 20.9095 10.3002C19.8395 9.59016 18.3095 9.35016 16.9395 9.59016'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.96852 7.16C6.02852 7.15 6.09852 7.15 6.15852 7.16C7.53852 7.11 8.63852 5.98 8.63852 4.58C8.63852 3.15 7.48852 2 6.05852 2C4.62852 2 3.47852 3.16 3.47852 4.58C3.48852 5.98 4.58852 7.11 5.96852 7.16Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.99945 14.4402C5.62945 14.6702 4.11945 14.4302 3.05945 13.7202C1.64945 12.7802 1.64945 11.2402 3.05945 10.3002C4.12945 9.59016 5.65945 9.35016 7.02945 9.59016'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.0001 14.6307C11.9401 14.6207 11.8701 14.6207 11.8101 14.6307C10.4301 14.5807 9.33008 13.4507 9.33008 12.0507C9.33008 10.6207 10.4801 9.4707 11.9101 9.4707C13.3401 9.4707 14.4901 10.6307 14.4901 12.0507C14.4801 13.4507 13.3801 14.5907 12.0001 14.6307Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.0907 17.7813C7.6807 18.7213 7.6807 20.2613 9.0907 21.2013C10.6907 22.2713 13.3107 22.2713 14.9107 21.2013C16.3207 20.2613 16.3207 18.7213 14.9107 17.7813C13.3207 16.7213 10.6907 16.7213 9.0907 17.7813Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default TeamIcon;
