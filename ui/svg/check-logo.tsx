const CheckLogo = (props: {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}) => {
  const {
    width = '24',
    height = '24',
    color = '#000000',
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
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckLogo;
