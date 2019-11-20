
import Select from 'react-select';
import styled, { css } from 'styled-components';

export const BlueprintSelectStyle = {
  theme: (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#137cbd',
      primary25: 'rgba(167, 182, 194, .3)',
    },
  }),
  styles: {
    control: (base, state) => ({
      ...base,
      minHeight: 30,
      border: 0,
      borderRadius: '3px',
      boxShadow: state.isFocused ? `
        0 0 0 1px #137cbd, 
        0 0 0 3px rgba(19, 124, 189, 0.3), 
        inset 0 1px 1px rgba(16, 22, 26, 0.2)
        ` : `
        0 0 0 0 rgba(19, 124, 189, 0), 
        0 0 0 0 rgba(19, 124, 189, 0), 
        inset 0 0 0 1px rgba(16, 22, 26, 0.15), 
        inset 0 1px 1px rgba(16, 22, 26, 0.2)
      `
    }),
    dropdownIndicator: base => ({
      ...base,
      padding: 4
    }),
    clearIndicator: base => ({
      ...base,
      padding: 4
    }),
    multiValue: base => ({
      ...base
    }),
    valueContainer: base => ({
      ...base,
      padding: '0px 6px'
    }),
    input: base => ({
      ...base,
      margin: 0,
      padding: 0
    })
  }
};

export const StyledSelect = styled(Select)`
  ${props => props.large && css`
    div[class*="-control"] {
      height: 40px;
    }
    
    div[class*="-singleValue"] {
      font-size: 16px;
    }
  `};
`;

