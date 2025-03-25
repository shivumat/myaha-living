const SignInLogo = (props: {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  onClick?: (e?: any) => void;
}) => {
  const {
    width = '24',
    height = '24',
    color = '#1D1B20',
    className,
    onClick,
  } = props;
  return (
    <svg
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8L16 12M16 12L12 16M16 12H3M3.33782 7C5.06687 4.01099 8.29859 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.29859 22 5.06687 19.989 3.33782 17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SignInLogo;
