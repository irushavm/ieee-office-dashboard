import { CSSProperties } from 'react'

export enum TileElementTypes {
    text_xs = 'text_xs',
    text_s = 'text_s',
    text_m = 'text_m',
    text_l = 'text_l',
    text_xl = 'text_xl',
    text_xxl = 'text_xxl',
    img = 'img',
    clock = 'clock',
    html = 'html'
}

export type TileLayoutItem = {
    ratio: number,
    style?: CSSProperties,
    layoutDir?: 'row' | 'column',
    layout?: [TileLayoutItem],
    layoutStyle: CSSProperties,
    type?: TileElementTypes,
    dataKey?: string,
    dataDefault?: string,
    text?: string,
    prefix?: string,
    postfix?: string,
    format: string,
    interval: number,
}

export type TileConfig = {
    service: string,
    title?: string,
    multi: number,
    timeout: number,
    align: string,
    layoutDir: string,
    layout: [TileLayoutItem],
}