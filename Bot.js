const BaseBot = require('bot-sdk');
const {renderRadar, renderNews, renderSingnal} = require('./render')

class Bot extends BaseBot {
    /**
     * postData可以不传，由于DuerOS对bot是post请求，sdk默认自动获取
     */
    constructor(postData) {
            super(postData);

            this.addLaunchHandler(() => {
                return renderNews()
            });

            this.addEventListener('UserEvent', (event) => {
                console.log('\n\nUserEvent recevied: '+ event.payload.componentId + event.payload.source);

                event.payload.componentId == 'REFRESH'
                event.payload.componentId == 'MENU.Signal'

                return renderNews()
            })

            /**
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
            */
    }
}

module.exports = Bot
