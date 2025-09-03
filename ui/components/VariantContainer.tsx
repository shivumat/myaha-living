import { mergeHexColorsWithWeights } from '#/lib/util';
import { useState } from 'react';
import Colors from '../colors/colors';

const basicColors: { name: string; hex: string }[] = [
  { name: 'red', hex: '#FF0000' },
  { name: 'blue', hex: '#0000FF' },
  { name: 'green', hex: '#008000' },
  { name: 'pink', hex: '#FFC0CB' },
  { name: 'yellow', hex: '#FFFF00' },
  { name: 'purple', hex: '#800080' },
  { name: 'orange', hex: '#FFA500' },
  { name: 'brown', hex: '#A52A2A' },
  { name: 'black', hex: `${Colors.black}` },
  { name: 'white', hex: `${Colors.white}` },
  { name: 'gray', hex: '#808080' },
  { name: 'cyan', hex: '#00FFFF' },
  { name: 'magenta', hex: '#FF00FF' },
  { name: 'beige', hex: '#F5F5DC' },
  { name: 'gold', hex: '#FFD700' },
  { name: 'silver', hex: '#C0C0C0' },
  { name: 'teal', hex: '#008080' },
  { name: 'navy', hex: '#000080' },
  { name: 'maroon', hex: '#800000' },
  { name: 'olive', hex: '#808000' },
];

// Function to find the best matching color
const getColorFromName = (colorName: string): string => {
  const lowerCaseColor = colorName.toLowerCase();
  const matchedColors = basicColors.filter((color) =>
    lowerCaseColor.includes(color.name),
  );
  const matchedColor = mergeHexColorsWithWeights(
    matchedColors.map((c, index) => ({
      hex: c.hex,
      weight: matchedColors.length - index,
    })),
  );
  return matchedColor ? matchedColor : '#ccc'; // Default gray if no match
};

const VariantContainer = (props: {
  name: string;
  values: string[];
  activeIndex: number;
  onVariantChange?: (name: string, value: string) => void;
}) => {
  const isColourVariant = props.name === 'Color';
  const isTitleVariant = props.name === 'Title';
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  return (
    <>
      {isColourVariant ? (
        <div style={{ display: 'flex', gap: '10px', position: 'relative' }}>
          {props.values.map((color: string, index: number) => {
            const backgroundColor = getColorFromName(color);
            const showTooltip = hoveredColor === color;

            return (
              <div
                key={index}
                onClick={() => props.onVariantChange?.(props.name, color)}
                onMouseEnter={() => setHoveredColor(color)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  backgroundColor,
                  border:
                    props.activeIndex === index
                      ? `1px solid ${Colors.black}`
                      : '0px',
                  position: 'relative',
                }}
              >
                {/* Tooltip for Non-Standard Colors */}
                {showTooltip && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '110%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: Colors.black,
                      color: Colors.white,
                      padding: '5px',
                      fontSize: '10px',
                      borderRadius: '3px',
                      whiteSpace: 'nowrap',
                      zIndex: 100,
                    }}
                  >
                    {color}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : isTitleVariant ? null : (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {props.values.map((value: string, index: number) => (
            <div
              key={index}
              onClick={() => props.onVariantChange?.(props.name, value)}
              style={{
                height: '30px',
                minWidth: '70px',
                maxWidth: '100px',
                padding: '5px',
                borderRadius: '5px',
                backgroundColor: '#f5f5f532',
                border:
                  props.activeIndex === index
                    ? `1px solid ${Colors.black}`
                    : `1px solid ${mergeHexColorsWithWeights([
                        { hex: Colors.black, weight: 2 },
                        { hex: Colors.white, weight: 9 },
                      ])}`,
                fontSize: '12px',
                fontWeight: '300',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={value} // Tooltip for long text
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
