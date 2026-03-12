import React from 'react';
import styled from 'styled-components';

const LogOutButton = ({ children, ...rest }) => {
  return (
    <StyledWrapper>
      <button {...rest}>
        <span className="btn__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </span>
        <span className="btn__label">{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.55em 1.4em;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #ff0072;
    background: transparent;
    border: 2px solid #ff0072;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(255, 0, 114, 0.15);
    transition: color 0.28s ease, box-shadow 0.28s ease, transform 0.15s ease;
    z-index: 1;
  }

  /* sliding fill */
  button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #ff0072, #ff4da6);
    transform: translateX(-105%);
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  button:hover::before,
  button:focus-visible::before {
    transform: translateX(0);
  }

  button:hover,
  button:focus-visible {
    color: #fff;
    box-shadow: 0 4px 18px rgba(255, 0, 114, 0.4);
    outline: none;
  }

  button:active {
    transform: scale(0.95);
    box-shadow: 0 2px 8px rgba(255, 0, 114, 0.25);
  }

  .btn__icon {
    display: flex;
    align-items: center;
    width: 17px;
    height: 17px;
    flex-shrink: 0;
    transition: transform 0.28s ease;
  }

  button:hover .btn__icon {
    transform: translateX(3px);
  }

  .btn__icon svg {
    width: 100%;
    height: 100%;
  }
`;

export default LogOutButton;
