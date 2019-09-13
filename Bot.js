const BaseBot = require('bot-sdk');

class Bot extends BaseBot {
    /**
     * postData可以不传，由于DuerOS对bot是post请求，sdk默认自动获取
     */
    constructor(postData) {
            super(postData);

            this.addLaunchHandler(() => {
                const document = new Bot.Directive.DPL.Document()
                return document.getDocumentFromPath('./launchDPL.json')
                    .then(json => {
                        const DPLDirective = new Bot.Directive.DPL.RenderDocument()
                        DPLDirective.setDocument(document)

                        const animationCommand = new Bot.Directive.DPL.Commands.AnimationCommand()
                        animationCommand.setAttribute('width');
                        animationCommand.setFrom('10dp');
                        animationCommand.setTo('100dp');
                        animationCommand.setEasing('ease-in');
                        animationCommand.setRepeatCount('3');
                        animationCommand.setRepeatMode('reverse');
                        animation.addCompleteCommands(new Bot.Directive.DPL.Commands.SendEventCommand())

                        return {
                            directives: [DPLDirective, animationCommand]
                        };
                    })
            });

            this.addIntentHandler('UserEvent', (event) => {
                console.log('UserEvent recevied');
                console.log(event)
            })

            // this.addIntentHandler('personal_income_tax.inquiry', () => {
            //     let loc = this.getSlot('location');
            //     let monthlySalary = this.getSlot('monthlysalary');

            //     if (!monthlySalary) {
            //         this.nlu.ask('monthlySalary');
            //         //  let card = new Bot.Card.TextCard('你工资多少呢');

            //         //  如果有异步操作，可以返回一个promise
            //         return new Promise(function (resolve, reject) {
            //             resolve({
            //                 directives: [this.getTemplate1('你工资多少呢')],
            //                 outputSpeech: '你工资多少呢'
            //             });
            //         });
            //     }

            //     if (!loc) {
            //         //  let card = new Bot.Card.TextCard('你在哪呢');
            //         this.nlu.ask('location');
            //         return {
            //             directives: [this.getTemplate1('你在哪呢')],
            //             outputSpeech: '你在哪呢'
            //         };

            //     }
            // });
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
