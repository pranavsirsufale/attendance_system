import React, { Children } from 'react';
import styled from 'styled-components';

const Button = ({children, ...rest}) => {
  return (
    <StyledWrapper>
      <button  {...rest}>
        {children}
        <span />
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    border: none;
    display: block;
    position: relative;
    padding: 0.7em 2.4em;
    font-size: 18px;
    background: transparent;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    color: royalblue;
    z-index: 1;
    font-family: inherit;
    font-weight: 500;
  }

  button span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: -1;
    border: 4px solid royalblue;
  }

  button span::before {
    content: "";
    display: block;
    position: absolute;
    width: 8%;
    height: 500%;
    background: var(--lightgray);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-60deg);
    transition: all 0.3s;
  }

  button:hover span::before {
    transform: translate(-50%, -50%) rotate(-90deg);
    width: 100%;
    background: royalblue;
  }

  button:hover {
    color: white;
  }

  button:active span::before {
    background: #2751cd;
  }`;

export default Button;
