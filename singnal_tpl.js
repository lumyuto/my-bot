

const refreshTpl = require('./refresh_tpl.js');

const stockTemplate = {
    "type": "Container",
    "height": "40dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
        "type": "Text",
        "font-size": "24px",
        "vertical-align": "bottom",
        "text": "${data.stock_name}",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "24px",
        "vertical-align": "bottom",
        "text": "${data.stock_symbol}",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "18px",
        "text": "${data.time}",
        "vertical-align": "bottom",
        "color": "#F1554D",
        "margin-right": "10dp",
    }],
}
const pTemplate = {
    "type": "Container",
    "height": "30dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
        "type": "Text",
        "font-size": "14px",
        "vertical-align": "bottom",
        "text": "${data.p_name}",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "14px",
        "vertical-align": "bottom",
        "text": "总收益：${data.total_gain}%",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "14px",
        "vertical-align": "bottom",
        "text": "年收益：${data.annualized_gain_rate}%",
        "margin-right": "10dp",
    }]
}

const rowItemTemplate = ({
    "type": "Container",
    "height": "80dp",
    "margin-bottom": "12dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
            "type": "Image",
            "width": "56dp",
            "height": "56dp",
            "scale-type": "fitXY",
            "src": "${data.buy_sell_icon}"
        }, {
            "type": "Container",
            "height": "100%",
            "width": "800dp",
            "margin-left": '25dp',
            "flex-direction": "column",
            "items": [stockTemplate, pTemplate]
        }]
})

const header = require('./header.js')

const left = ({data}) => ({
    "type": "Container",
    "height": "100%",
    "width": "933dp",
    "padding-left": '60dp',
    "padding-top": '10dp',
    "background-color": '#353A47',
    "items": [
        header(['关注', '量化', '雪球', '东方财富']),
        {
            "type": "List",
            "height": "100%",
            "width": "100%",
            "direction": "vertical",
            "data": data,
            "items": [rowItemTemplate]
        }
    ],
    ...refreshTpl(25, 'Signal')
})

module.exports = {
    singnal_tpl: left
}