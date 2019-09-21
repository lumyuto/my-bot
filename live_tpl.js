

const refreshTpl = require('./refresh_tpl.js');

const img1 = 'http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/%E4%BD%8D%E5%9B%BE2.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T22%3A37%3A57Z%2F-1%2F%2F00f808e491ea7c0eae469593802eac1955c028dfa3da142071faf1b366e0289d'
const img2 = 'http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/%E4%BD%8D%E5%9B%BE3.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T22%3A37%3A57Z%2F-1%2F%2Fccadab1246ba79d39fdb9bf92dbb905033dc482f21b99b1a9bb5282f3800d3f7'
const img3 = 'http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/%E4%BD%8D%E5%9B%BE1.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T22%3A37%3A57Z%2F-1%2F%2Fc9a633db15ca8a01726fc4a3e4c9462d71af6863edb187a0def8193177e88456'

const left = {
    "type": "Container",
    "height": "100%",
    "width": "933dp",
    "padding-left": '60dp',
    "padding-top": '60dp',
    "background-color": '#353A47',
    "flex-direction": "column",
    "items": [
        {
            "type": "Image",
            "width": "445dp",
            "height": "250dp",
            "scale-type": "fitXY",
            "src": img1,
            "margin-bottom": "20dp",
            "margin-right": "20dp",
        },{
            "type": "Image",
            "width": "488dp",
            "height": "250dp",
            "scale-type": "fitXY",
            "src": img2,
            "margin-bottom": "20dp",
            "margin-right": "20dp",
        }
    ],
    ...refreshTpl(25, 'Live')
}

module.exports = {
    live_tpl: left
}