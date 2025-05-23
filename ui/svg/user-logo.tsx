import newStyled from '@emotion/styled';
import { CiUser } from 'react-icons/ci';
import Colors from '../colors/colors';

const StyledUser = newStyled(CiUser)<{ color: string }>`
  transform: scale(1.5);

  :hover{
    transform: scale(1.7) !important;
  }
  @media (max-width: 800px) {
    transform: scale(1);
    :hover{
      transform: scale(1.2) !important;
    }
  }
`;

const UserLogo = (props: {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  onClick?: (e?: any) => void;
}) => {
  return (
    <StyledUser
      className={props.className}
      onClick={(e) => props.onClick?.(e)}
      color={props.color ?? Colors.black}
    />
  );
};

export default UserLogo;
