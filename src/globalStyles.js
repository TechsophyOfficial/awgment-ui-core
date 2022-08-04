import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme?.content?.fonts?.font} , Open-Sans, Helvetica, Sans-Serif;
  }

a : hover {
  color : ${({ theme }) => theme?.content?.colors.textColor};
}
 
option:checked {
  background: ${({ theme }) => theme?.content?.colors.headerColor};
  color : ${({ theme }) => theme?.content?.colors.textColor};
}
option:focus {
  background: ${({ theme }) => theme?.content?.colors.headerColor};
  color : ${({ theme }) => theme?.content?.colors.textColor};
}

  .accordion .card-header{
    color: ${({ theme }) => theme?.content?.colors.headerColor};
  }
  .dropdown-item.active ,   .dropdown-item:active{
      background-color: ${({ theme }) => theme?.content?.colors.headerColor};
    }
    .Select-option.is-selected {
      color: red;
  }
    
  button.saveButton, button.cancelButton  {
    background-color : transparent;
    color : #fff;
    border-color: ${({ theme }) => theme?.content?.colors.headerColor};
    margin-left:13px; ;
    background-color: ${({ theme }) => theme?.content?.colors.headerColor};

    &:hover, &:active , &:focus {
        color : #212529;
        background-color : transparent;
        border-color : ${({ theme }) => theme?.content?.colors.headerColor};
    }
    &:not(:disabled):not(.disabled):active {
        color : #fff;
        border-color: ${({ theme }) => theme?.content?.colors.headerColor};
        background-color: ${({ theme }) => theme?.content?.colors.headerColor};
    }
    &:disabled  {
        color : #fff;
        border-color: ${({ theme }) => theme?.content?.colors.headerColor};
        background-color: ${({ theme }) => theme?.content?.colors.headerColor};
        opacity : 0.65
    }
  }

  button.linkButton{
    color: ${({ theme }) => theme?.content?.colors.textColor};
    border-color:  ${({ theme }) => theme?.content?.colors.textColor};
    > span {
      margin : 0 5px
    }
    &:hover, &:active , &:focus {
      color: #fff;
      font-weight : bold;
      background-color:  ${({ theme }) => theme?.content?.colors.textColor};

  }
  }

  button.deleteButton {
    color : #fff;
    border-color: #d11a2a;
    margin-left:13px; ;
    background-color: #d11a2a;
    &:hover, &:active , &:focus {
      color : #d11a2a;
      background-color : transparent;
      border-color :#d11a2a ;
  }
  }
  .MuiTooltip-tooltip{
    background-color :  ${({ theme }) => theme?.content?.colors.headerColor} !important;
    .MuiTooltip-arrow {
      color :  ${({ theme }) => theme?.content?.colors.headerColor} !important;
    }
  }

  .page-title{
    margin : 15px 0px
  }
  .core-dropdown:focus, .core-dropdown:active{
    border-color: ${({ theme }) => theme?.content?.colors.headerColor};
    box-shadow : none
  }

  .core-dropdown:after {
    content: none;
    display : none !important;
  }
  .core-ui-tabs .nav-link {
    background-color: ${({ theme }) => theme?.content?.colors.headerColor};
    color: #fff;
  }

  .core-ui-tabs.nav-tabs .nav-link.active {
    color : ${({ theme }) => theme?.content?.colors.textColor};
    background-color: ${({ theme }) => theme?.content?.colors.headerColor};
    border : none;
    border-bottom : 1px solid transparent;
    border-color : ${({ theme }) => theme?.content?.colors.textColor};
    }
  

  [id*="MFE-container"] {  /* WE USE * HERE */
   position : relative;
}
.btn-outline-secondary {
  border-color : ${({ theme }) => theme?.content?.colors.headerColor}; 
  border-radius : 9px;
  &:active, &:hover , &:focus {
    color : #212529 !important;
    background-color : transparent !important;
    border-color : ${({ theme }) => theme?.content?.headerColor};
    box-shadow : 1px 1px 3px 2px var(--box-shadow-color)
  }
}
button.btn-outline-primary {
  border-color : ${({ theme }) => theme?.content?.colors.textColor}; 
  border-radius : 9px;
  color : ${({ theme }) => theme?.content?.colors.textColor}; 
  &:active, &:hover , &:focus {
    color : #fff;
    background-color : ${({ theme }) => theme?.content?.colors.textColor};
    border-color : ${({ theme }) => theme?.content?.colors.textColor};
    box-shadow : 1px 1px 3px 2px var(--box-shadow-color)
  }
}
  .core-ui-button{
    --box-shadow-color: ${({ theme }) => theme?.content?.colors.headerColor};
    background-color : ${({ theme }) => theme?.content?.colors.headerColor};
color : #fff;
border-color: ${({ theme }) => theme?.content?.colors.headerColor};
margin-right : 10px;
border-radius : 9px;

&:active, &:hover , &:focus {
  color : #212529 !important;
  background-color : transparent !important;
  border-color : ${({ theme }) => theme?.content?.headerColor};
  box-shadow : 1px 1px 3px 2px var(--box-shadow-color)
}
  } 

  button.btn-primary{
    --box-shadow-color: ${({ theme }) => theme?.content?.colors.textColor};
    background-color : ${({ theme }) => theme?.content?.colors.textColor};
color : #fff;
border-color: ${({ theme }) => theme?.content?.colors.textColor};
margin-right : 10px;
border-radius : 9px;

&:active, &:hover , &:focus {
  color : #212529 !important;
  background-color : transparent !important;
  border-color : ${({ theme }) => theme?.content?.textColor};
  box-shadow : 1px 1px 3px 2px var(--box-shadow-color)
}
  } 
.cutom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;  
  display: block;
}
.cutom-scrollbar::-webkit-scrollbar-thumb {
  background-color:${({ theme }) => theme?.content?.colors.textColor};
}
`;

export default GlobalStyle;
