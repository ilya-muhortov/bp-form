
import styled from 'styled-components';


const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#6c6';
  }
  return '#666';
};

export const StyledDropzone = styled.div`
`;
