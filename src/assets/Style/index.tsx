import { createGlobalStyle } from 'styled-components';
import { STYLE_GUIDE } from './global';

export const IndexStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto';
    
  }

  ::-webkit-scrollbar{
      width: 5px;
  }

  ::-webkit-scrollbar-track{
      background-color: transparent;
  }

  ::-webkit-scrollbar-thumb{
      background-color: ${STYLE_GUIDE.color.secondary} ;
  }
`;