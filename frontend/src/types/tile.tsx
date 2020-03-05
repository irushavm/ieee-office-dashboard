import { CSSProperties } from "react"

export enum TileElementTypes {
    text_xs = "text_xs",
    text_s = "text_s",
    text_m = "text_m",
    text_l = "text_l",
    text_xl = "text_xl",
    text_xxl = "text_xxl",
    img = "img"
}

export type TileLayoutItem = {
    ratio: number,
    style?: CSSProperties,
    padding?: string,
    layoutDir?: 'row' | 'column',
    layout?: [TileLayoutItem],
    type?: TileElementTypes,
    dataKey?: string,
    dataDefault?: string,
    text?: string,
    prefix?: string,
    postfix?: string,
}

export type TileConfig = {
    title?: string,
    multi: number,
    timeout: number,
    align: string,
    layoutDir: string,
    layout: [TileLayoutItem],
}