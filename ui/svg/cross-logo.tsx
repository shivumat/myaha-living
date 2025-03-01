const CrossLogo = (props: {
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
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default CrossLogo;
