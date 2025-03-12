const VariantContainer = (props: {
  name: string;
  values: string[];
  activeIndex: number;
  onVariantChange?: (name: string, value: string) => void;
}) => {
  const isColourVariant = props.name === 'Colour';
  const isTitleVariant = props.name === 'Title';
  return (
    <>
      <div>{!isTitleVariant && props.name}</div>
      {isColourVariant ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          {props?.values?.map((color: string, index: number) => (
            <div
              onClick={() => props.onVariantChange?.(props.name, color)}
              key={index}
              style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                backgroundColor: color,
                border: !(props.activeIndex === index)
                  ? '0px solid black'
                  : '1px solid black',
              }}
            />
          ))}
        </div>
      ) : isTitleVariant ? null : (
        <div style={{ display: 'flex', gap: '10px' }}>
          {props?.values?.map((value: string, index: number) => (
            <div
              onClick={() => props.onVariantChange?.(props.name, value)}
              key={index}
              style={{
                height: '30px',
                minWidth: '70px',
                maxWidth: '150px',
                padding: '5px',
                borderRadius: '5px',
                backgroundColor: '#f5f5f532',
                border: !(props.activeIndex === index)
                  ? '0px solid black'
                  : '1px solid black',
                fontSize: '12px',
                fontWeight: '300',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VariantContainer;
