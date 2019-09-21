

const refreshTpl = require('./refresh_tpl.js');

const itemTemplate = index => ({
    "type": "Container",
    "height": "100dp",
    "width": "160dp",
    "margin-right": "12dp",
    "position": "relative",
    "background-color": "#ffffff",
    "items": [{
            "type": "Image",
            "width": "100%",
            "height": "100%",
            "position": "absolute",
            "scale-type": "fitXY",
            "src": "${data["+index+"].img}"
        }, {
            "type": "Text",
            "font-size": "39px",
            "text": "${data["+index+"].title}",
            "margin-left": "10dp",
        }, {
            "type": "Text",
            "font-size": "19px",
            "text": "${data["+index+"].factor}",
            "margin-top": "22dp",
            "margin-left": "10dp",
        }, {
            "type": "Text",
            "font-size": "19px",
            "color": "${data["+index+"].value_color}",
            "text": "${data["+index+"].value}",
            "text-align": "right",
            "position": "relative",
            "top": "-26dp",
            "margin-right": "10dp"
        }, 
    ]
})

const rowItemTemplate = {
    "type": "Container",
    "height": "100dp",
    "width": "100%",
    "margin-bottom": "28dp",
    "flex-direction": "row",
    "items": [
        itemTemplate(0), 
        itemTemplate(1), 
        itemTemplate(2), 
        itemTemplate(3), 
        itemTemplate(4)]
}

const header = require('./header.js')

const left = ({data}) => ({
    "type": "Container",
    "height": "100%",
    "width": "933dp",
    "padding-left": '20dp',
    "padding-top": '10dp',
    "background-color": '#353A47',
    "items": [
        header,
        {
            "type": "List",
            "height": "100%",
            "width": "100%",
            "direction": "vertical",
            "data": data,
            "items": [rowItemTemplate]
        }
    ],
    ...refreshTpl(25, 'Radar')
})

module.exports = {
    radar_tpl: left
}