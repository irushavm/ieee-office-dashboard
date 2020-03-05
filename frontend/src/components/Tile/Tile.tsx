import React, { CSSProperties, useState } from "react";
import styled, { css } from "styled-components";
import { TileConfig, TileLayoutItem, TileElementTypes } from "../../types/tile";
import { getValueAtPath, useInterval } from "../../helpers/";

import { TileSliderItem } from "./TileSliderItem";

import { TextXS, TextS, TextM, TextL, TextXL, TextXXL, Img } from "./TileItems";

type TileProps = {
  config: TileConfig,
  data: any,
  name: string,
};

const TileRoot = styled.div`
    width: 100%;
`

const Title = styled.div`
    padding-top: 0.5vh;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    color: #222;
`
type TileContainerProps = {
    titleExists: boolean
}

const TileContainer = styled.div`
  display: flex;
  ${({titleExists}: TileContainerProps) => css`
        ${titleExists ? `height: calc(100% - 3rem)` : `height: 100%`}
    `
    }
`;

const createTileLayout = (
  item: TileLayoutItem,
  data: any,
  align: string = "left",
  key: string
) => {
  if (item.layout! && item.type!) {
    throw new Error(
      "Item cannot have both type and layout. Check the layout confirguration"
    );
  }
  const flexDirection = item.layoutDir;
  const flexRatio = item.ratio as number;

  const divStyle: CSSProperties = {
    display: "flex",
    flexDirection,
    flex: `1 ${flexRatio * 100}%`,
    justifyContent: align
  };

  let element, elementData;
  if (item.dataKey!) {
    elementData = item.dataKey && getValueAtPath(data, item.dataKey, item.dataDefault);
  } else if (item.text!) {
    elementData = item.text;
  }
  elementData = `${item.prefix || ''}${elementData || ''}${item.postfix || ''}`;

  if (item.type!) {
    switch (item.type) {
      case TileElementTypes.text_xs:
        element = <TextXS style={item.style}>{elementData}</TextXS>
        break;
      case TileElementTypes.text_s:
        element = <TextS style={item.style}>{elementData}</TextS>
        break;
      case TileElementTypes.text_m:
        element = <TextM style={item.style}>{elementData}</TextM>
        break;
      case TileElementTypes.text_l:
        element = <TextL style={item.style}>{elementData}</TextL>
        break;
      case TileElementTypes.text_xl:
        element = <TextXL style={item.style}>{elementData}</TextXL>
        break;
      case TileElementTypes.text_xxl:
        element = <TextXXL style={item.style}>{elementData}</TextXXL>
        break;
      case TileElementTypes.img:
        element = <Img src={elementData} style={item.style}></Img>;
        break;
    }
  }

  return (
    <div key={key} style={divStyle}>
      {item.layout &&
        item.layout.map((layoutItem, index) =>
          createTileLayout(layoutItem, data, align, `${key}-${index}`)
        )}
      {element}
    </div>
  );
};

export const Tile = ({ config, data, name }: TileProps) => {
  let [show, setShow] = useState(Array.from(Array(config.multi).keys()));
  useInterval(() => {
    const showCopy = [...show];
    /* Hide all slides */
    setShow(show.map(_ => -1));
    /* After 400ms, resume active items calculation */
    setTimeout(() => {
      setShow(showCopy.map(e => (e + 2) % data!.data!.length));
    }, 500);
  }, config.timeout);

  const elementStyles = {
    flex: `1 ${100 / config.multi! - 10}%`,
    flexDirection: config.layoutDir
  };
  if(!config.multi) {
    return (
        <TileRoot>
            {config.title! && <Title>{config.title}</Title>}
            <TileContainer titleExists={config.title!}>
                {config.layout.map((layoutItem, index) =>
                    createTileLayout(layoutItem, data, config.align, `${name}-${index}`)
                )}
            </TileContainer>
        </TileRoot>
    )
  }
  return (
      <TileRoot>
        {config.title! && <Title>{config.title}</Title>}
        <TileContainer titleExists={config.title!}>
        {data!.data!.map((dataItem: any, index: number) => {
            return (
            <TileSliderItem key={index} style={elementStyles} show={show.includes(index)}>
                {config.layout.map((layoutItem, index) =>
                createTileLayout(layoutItem, dataItem, config.align, `${name}-${index}`)
                )}
            </TileSliderItem>
            );
        })}
        </TileContainer>
    </TileRoot>
  );
};
