import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

export const FullPageSlideContainer = styled.div`
  width: 100%;
  height: inherit;
  overflow: hidden;
`;

export function Content({ className, children }) {
  return (
    <div
      className={`container h-full mx-auto 
px-12 md:px-20 lg:px-48 
flex flex-col justify-center ${className}`}
    >
      {children}
    </div>
  );
}

function notEmpty(x, y, z) {
  return x ? x : y ? y : z ? z : ' ';
}

function HeaderCurry(Tag = 'span', defaultClassNames) {
  const {
    textSize: defaultTextSize,
    textAlign: defaultTextAlign,
    textColor: defaultTextColor,
    textWeight: defaultTextWeight,
    lineHeight: defaultLineHeight,
    others: defaultOtherClassNames,
  } = defaultClassNames;

  return ({ className, style, children, overrideClassNames = {} }) => {
    const {
      textSize,
      textColor,
      textWeight,
      lineHeight,
      textAlign,
    } = overrideClassNames;
    return (
      <Tag
        className={`
        ${notEmpty(textSize, defaultTextSize)}
        ${notEmpty(textAlign, defaultTextAlign)}
        ${notEmpty(textColor, defaultTextColor)}
        ${notEmpty(textWeight, defaultTextWeight)}
        ${notEmpty(defaultOtherClassNames)}
        ${notEmpty(className)}`}
        style={{
          ...style,
          ...(lineHeight
            ? { lineHeight }
            : defaultLineHeight
            ? {
                lineHeight: defaultLineHeight,
              }
            : void 0),
        }}
      >
        {children}
      </Tag>
    );
  };
}

export const Header1 = HeaderCurry('h1', {
  textSize: 'text-4xl md:text-5xl lg:text-6xl',
  textColor: 'text-gray-800',
  textWeight: 'font-bold',
  lineHeight: '1.25',
});

export const Header1Smaller = HeaderCurry('h1', {
  textSize: 'text-3xl md:text-4xl lg:text-5xl',
  textColor: 'text-gray-800',
  textWeight: 'font-bold',
  lineHeight: '1.25',
});

export const Header2 = HeaderCurry('h1', {
  textSize: 'text-2xl md:text-3xl lg:text-4xl',
  textColor: 'text-gray-300	',
  textWeight: 'font-semibold',
  lineHeight: '1.25',
  others: 'py-8',
});

export const Header2Smaller = HeaderCurry('h1', {
  textSize: 'text-xl md:text-2xl lg:text-3xl',
  textColor: 'text-gray-300	',
  textWeight: 'font-semibold',
  lineHeight: '1.25',
  others: 'py-8',
});

export const Stat = HeaderCurry('div', {
  textSize: ' text-2xl md:text-4xl lg:text-5xl',
  textColor: 'text-gray-400',
  textWeight: 'font-semibold',
  others: 'text-center md:text-left my-2',
});

export const ChartContainer = ({ className, children }) => {
  return (
    <div className={`opacity-80 center m-auto my-4 w-2/3 ${className}`}>
      {children}
    </div>
  );
};
