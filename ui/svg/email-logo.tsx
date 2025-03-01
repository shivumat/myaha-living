const EmailLogo = (props: {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
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
        d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default EmailLogo;
