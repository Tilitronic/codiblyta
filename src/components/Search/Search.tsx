import { ChangeEvent, KeyboardEvent } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

interface SearchProps {
  label: string
  value: string
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
  onClear: () => void
}

export function Search({
  label, value, handleInput, onSearch, onClear
}: SearchProps) {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <div style={styles.searchInput}>
      <TextField
        label={label}
        type="search"
        value={value}
        onChange={handleInput}
        onKeyDown={onKeyDown}
        InputProps={{
          endAdornment: value
            ? (
              <IconButton size="small" onClick={onClear}>
                <ClearIcon />
              </IconButton>
            )
            : null
        }}
      />
      <Button variant="contained" onClick={onSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
}

const styles = {
  searchInput: {
    display: 'flex',
    margin: '15px',
    maxWidth: '270px'
  }
};
