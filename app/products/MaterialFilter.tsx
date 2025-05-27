'use client';

import { Collection, Collections } from '#/context/ProductContext';
import Colors from '#/ui/colors/colors';
import { MultiSelectDropdown } from '#/ui/components/MultiSelectDropdown';
import styled from '@emotion/styled';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CollectionFilter = (props: {
  collections: Collections;
  label: string;
}) => {
  const { collections, label } = props;
  const [selectedMaterials, setSelectedMaterials] = useState<Collections>([]);
  const [open, setOpen] = useState(false);

  const renderLabel = (selected: Collections) => {
    if (selected.length === 0) return `Select ${label}`;
    if (selected.length <= 2) return selected.map((i) => i.title).join(', ');
    return `${selected
      .slice(0, 2)
      .map((i) => i.title)
      .join(', ')} +${selected.length - 2} more`;
  };

  return (
    <FilterWrapper>
      <MultiSelectDropdown
        options={collections}
        selectedOptions={selectedMaterials}
        onChange={(newSelected: Collections) =>
          setSelectedMaterials(newSelected)
        }
        renderTrigger={(toggle, selected) => (
          <TriggerBox
            onClick={() => {
              setOpen(!open);
              toggle();
            }}
          >
            <span>{renderLabel(selected)}</span>
            {open ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </TriggerBox>
        )}
        renderOptionLabel={(option: Collection) => option.title}
        maxHeight="300px"
      />
    </FilterWrapper>
  );
};

export default CollectionFilter;

// === Styling ===
const FilterWrapper = styled.div``;

const TriggerBox = styled.div`
  padding: 10px 0px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${Colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
`;
