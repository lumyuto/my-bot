const BaseBot = require('bot-sdk');

const DPL = {
    "type": "DPL",
    "version": "1.0",
    "mainTemplate": {
        "parameters": [
            "payload"
        ],
        "items": [
            {
                "type": "Image",
                "position": "absolute",
                "top": "0dp",
                "left": "0dp",
                "src": "https://duerstatic.bj.bcebos.com/dbp-image%2FDPLMaterial%2Fimage2019-6-24_18-57-352.jpg",
                "height": "100%",
                "width": "100%"
            },
            {
                "type": "Container",
                "width": "100%",
                "height": "100%",
                "items": [
                    {
                        "type": "Header",
                        "headerTitle": "你知道吗？",
                        "headerImage": "https://skillstore.cdn.bcebos.com/icon/23/fc7581b7-b505-1f44-ab52-3d9f5e567dfd.png",
                        "hasBackIcon": true
                    },
                    {
                        "type": "Container",
                        "height": "80%",
                        "width": "90%",
                        "margin-left": "5%",
                        "margin-top": "5%",
                        "items": [
                            {
                                "type": "Text",
                                "text": "判断鸡蛋有没有熟，可以转个圈，可以转的是熟的，不能的，就是没熟的。并且，新的鸡蛋壳不好剥开，容易将蛋白也剥下来。老的，也就是尘鸡蛋比较容易剥开。",
                                "font-size": "45dp",
                                "font-style": "normal",
                                "letter-specing": "25dp"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
class Bot extends BaseBot {
    /**
     * postData可以不传，由于DuerOS对bot是post请求，sdk默认自动获取
     */
    constructor(postData) {
            super(postData);

            this.addLaunchHandler(() => {

                const DPLDirective = new Bot.Directive.DPL.RenderDocument({
                    getData: () => DPL
                })
                return {
                    directives: [DPLDirective],
                    outputSpeech: '欢迎使用!'
                };
            });

            this.addIntentHandler('personal_income_tax.inquiry', () => {
                let loc = this.getSlot('location');
                let monthlySalary = this.getSlot('monthlysalary');

                if (!monthlySalary) {
                    this.nlu.ask('monthlySalary');
                    //  let card = new Bot.Card.TextCard('你工资多少呢');

                    //  如果有异步操作，可以返回一个promise
                    return new Promise(function (resolve, reject) {
                        resolve({
                            directives: [this.getTemplate1('你工资多少呢')],
                            outputSpeech: '你工资多少呢'
                        });
                    });
                }

                if (!loc) {
                    //  let card = new Bot.Card.TextCard('你在哪呢');
                    this.nlu.ask('location');
                    return {
                        directives: [this.getTemplate1('你在哪呢')],
                        outputSpeech: '你在哪呢'
                    };

                }
            });
    }
    /**
     *  获取文本展现模板
     *
     *  @param {string} text 歌曲详情
     *  @return {RenderTemplate} 渲染模版
     */
    getTemplate1(text) {
        let bodyTemplate = new BaseBot.Directive.Display.Template.BodyTemplate1();
        bodyTemplate.setPlainTextContent(text);
        let renderTemplate = new BaseBot.Directive.Display.RenderTemplate(bodyTemplate);
        return renderTemplate;
    }
}

module.exports = Bot
