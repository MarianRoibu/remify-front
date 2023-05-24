import { createGlobalStyle } from 'styled-components';

export const colors = {
  "white": "#FCFDFF",
  "black": "#010A13",
  "grey": "#888D93",
  "dark-blue": "#1a2639",
  "blue": "#113f67"
}

export const fontSize = {
  "span": "15px",
  "p": "20px"
}

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
    font-family: 'Rubik', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: ${colors.white}
  }
  body::-webkit-scrollbar-track{

	border-radius: 10px;
	background-color: #ffffff;
}

body::-webkit-scrollbar{
	width: 5px;
	background-color: ${colors.grey};
  opacity: 0.6;
}

body::-webkit-scrollbar-thumb{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: ${colors['dark-blue']};
  border: 0.1px solid ${colors.black};
  opacity: 0.6;
  border-radius: 8px;
}
  body{
    background-color: ${colors['dark-blue']};
  }
  a {
    color: ${colors.white};
    text-decoration: none;
  }
`

