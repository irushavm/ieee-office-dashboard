import { InfoTile } from './InfoTile/InfoTile'

export default {
    InfoTile,
    config: {
        instagram: {
            title: 'Instagram Updates',
            multi: 1,
            timeout: 8000,
            align: 'left',
            layoutDir: 'column',
            layout: [
                {
                    ratio: 0.7,
                    type: 'img',
                    dataKey: 'imgSrc'
                },
                {
                    ratio: 0.3,
                    type: 'text_l',
                    style: {
                        color: '#000',
                        padding: '1vh'
                    },
                    padding: '0.5vh',
                    dataKey: 'caption'
                }
            ]
        },
        twitter: {
            title: 'Twitter Updates',
            multi: 1,
            timeout: 4000,
            align: 'left',
            layoutDir: 'column',
            layout: [
                {
                    ratio: 0.1,
                    type: 'text_m',
                    style: {
                        color: '#444'
                    },
                    dataKey: 'time',
                    prefix: 'On '
                },
                {
                    ratio: 0.9,
                    type: 'text_l',
                    style: {
                        color: '#000'
                    },
                    dataKey: 'message'
                }
            ]
        },
        gallery: {
            multi: 1,
            timeout: 6000,
            align: 'center',
            layoutDir: 'column',
            layout: [
                {
                    ratio: 0.8,
                    type: 'img',
                    dataKey: 'src'
                },
                {
                    ratio: 0.2,
                    type: 'text_xl',
                    style: {
                        color: '#000',
                        textAlign: 'center'
                    },
                    dataKey: 'name'
                }
            ]

        },
        calendar: {
            title: 'Upcoming Events',
            multi: 1,
            timeout: 10000,
            align: 'left',
            layoutDir: 'column',
            layout: [
                {
                    ratio: 0.1,
                    type: 'text_xl',
                    style: {
                        color: '#2A5A8C'
                    },
                    dataKey: 'summary'
                },
                {
                    ratio: 0.1,
                    layoutDir: 'column',
                    layout: [
                        { ratio: 0.2, type: 'text_s', style: { color: '#3d3d3d' }, text: 'Duration' },
                        { ratio: 0.8, type: 'text_l', style: { color: '#000' }, dataKey: 'duration' }
                    ]
                },
                {
                    ratio: 0.1,
                    layoutDir: 'column',
                    layout: [
                        { ratio: 0.2, type: 'text_s', style: { color: '#3d3d3d' }, text: 'Location' },
                        { ratio: 0.8, type: 'text_l', style: { color: '#000' }, dataKey: 'location' }
                    ]
                },
                {
                    ratio: 0.7,
                    layoutDir: 'column',
                    layout: [
                        { ratio: 0.02, type: 'text_s', style: { color: '#3d3d3d' }, text: 'Description' },
                        { ratio: 0.98, type: 'text_l', style: { color: '#000' }, dataKey: 'description' }
                    ]
                }
            ]
        },
        transpo: {
            title: null,
            multi: 1,
            timeout: 7000,
            align: 'center',
            layoutDir: 'row',
            layout: [
                {
                    ratio: 0.25,
                    layoutDir: 'column',
                    layout: [
                        { ratio: 0.6, type: 'text_xxl', style: { color: '#b70101' }, dataKey: 'routeNo' },
                        { ratio: 0.4, type: 'text_l', style: { color: '#444'}, dataKey: 'heading' }
                    ]
                },
                {
                    ratio: 0.75,
                    layoutDir: 'row',
                    layout: [
                        {
                            ratio: 0.3,
                            layoutDir: 'column',
                            layout: [
                                { ratio: 0.5, type: 'text_xl', style: { color: '#000' }, dataKey: 'trips[0].time', dataDefault: 'N/A' },
                                { ratio: 0.5, type: 'text_l', style: { color: '#444' }, dataKey: 'trips[0].dest' }
                            ]
                        },
                        {
                            ratio: 0.3,
                            layoutDir: 'column',
                            layout: [
                                { ratio: 0.5, type: 'text_xl', style: { color: '#000' }, dataKey: 'trips[1].time', dataDefault: 'N/A' },
                                { ratio: 0.5, type: 'text_l', style: { color: '#444' }, dataKey: 'trips[1].dest' }
                            ]
                        },
                        {
                            ratio: 0.3,
                            layoutDir: 'column',
                            layout: [
                                { ratio: 0.5, type: 'text_xl', style: { color: '#000' }, dataKey: 'trips[2].time', dataDefault: 'N/A' },
                                { ratio: 0.5, type: 'text_m', style: { color: '#444' }, dataKey: 'trips[2].dest' }
                            ]
                        }
                    ]
                }
            ]
        },
        openweathermap: {
            title: null,
            multi: 2,
            timeout: 4500,
            align: 'center',
            layoutDir: 'column',
            layout: [
                {
                    ratio: 0.3,
                    layoutDir: 'row',
                    layout: [
                        { ratio: 0.3, type: 'text_l', dataKey: 'date' },
                        { ratio: 0.3, type: 'img', dataKey: 'icon' },
                        { ratio: 0.3, type: 'text_l', dataKey: 'condition' }
                    ]
                },
                {
                    ratio: 0.6,
                    layoutDir: 'row',
                    layout: [
                        {
                            ratio: 0.3,
                            layoutDir: 'column',
                            layout: [
                                { ratio: 0.5, type: 'text_l', style: { color: '#000' }, dataKey: 'high', postfix: ' °C' },
                                { ratio: 0.5, type: 'text_s', style: { color: '#444' }, text: 'HIGH' }
                            ]
                        },
                        {
                            ratio: 0.3,
                            layoutDir: 'column',
                            layout: [
                                { ratio: 0.5, type: 'text_l', style: { color: '#000' }, dataKey: 'low', postfix: ' °C' },
                                { ratio: 0.5, type: 'text_s', style: { color: '#444' }, text: 'LOW' }
                            ]
                        },
                        {
                            ratio: 0.3,
                            layoutDir: 'column',
                            layout: [
                                { ratio: 0.5, type: 'text_l', style: { color: '#000' }, dataKey: 'wind', postfix: ' kph'},
                                { ratio: 0.5, type: 'text_s', style: { color: '#444' }, text: 'WIND' }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
