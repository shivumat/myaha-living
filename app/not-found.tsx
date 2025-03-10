export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '95vh',
      }}
    >
      <p style={{ fontWeight: 'lighter', fontSize: '16px' }}>
        The page you are looking for doesn’t exist
      </p>
      <img
        src="/images/error.png"
        alt="404"
        style={{ width: '40%', height: 'auto' }}
      />
    </div>
  );
}
