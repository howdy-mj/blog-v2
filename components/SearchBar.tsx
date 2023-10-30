import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const onClear = () => {
    onChange('');
  };
  return (
    <StyledLabel>
      <StyledInput
        type="text"
        placeholder="Search title or #tag."
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
      <SearchButton>
        {value ? <TiDeleteOutline onClick={onClear} /> : <AiOutlineSearch />}
      </SearchButton>
    </StyledLabel>
  );
};

export default SearchBar;

const StyledLabel = styled.label`
  display: flex;
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #d8d8d8;
  border-radius: 0.4rem;
  background-color: #f4f5f7;
  color: var(--text-black);

  &:focus {
    border-color: #888;
  }
`;

const SearchButton = styled.button`
  > svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: var(--text-black);
  }
`;
