cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Node
        },
        btn1: {
            default: null,
            type: cc.Node
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        bestScore: {
            default: null,
            type: cc.Label
        }
    },

    onLoad() {
        let theScore = this.canvas.getComponent("snake_game").score;
        this.scoreLabel.string = "Score:" + theScore.toString();
        if(theScore>0){
            //如果有分数,就向子域中发送分数
            const openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage({
                score: theScore,
                year: (new Date()).getFullYear()
            })
        }  

        //let globalNode = cc.director.getScene().getChildByName('gameUser').getComponent('game_user_js');
        //let bestScore = globalNode.userGameInfo.snakeBestScore || 0;
        // let db = wx.cloud.database();

        // if (theScore > bestScore) {
        //     bestScore = theScore;
        //     db.collection('userGameInfo').where({
        //         _openid: globalNode.openid
        //     }).get({
        //         success: function(res) {
        //             db.collection('userGameInfo').doc(res.data[0]._id).update({
        //                 data: {
        //                     'snakeBestScore': bestScore,
        //                     'updateTime': db.serverDate()
        //                 },
        //                 success: function(sc) {
        //                     globalNode.setUserGameInfo('snakeBestScore', bestScore);
        //                     console.log('保存成功')
        //                 }
        //             })
        //         }
        //     })
        // };

        //this.bestScore.string = 'best:' + bestScore;

        this.btn1.on(cc.Node.EventType.TOUCH_START, (e) => {
            this.node.runAction(
                cc.sequence(
                    cc.fadeOut(0.2),
                    cc.callFunc(() => {
                        // 加载列表
                        cc.director.loadScene('snake');
                    }, this)
                )
            );
        }, this)
    },

    backToList() {
        cc.director.loadScene('snakeBanner');
    },
    endShare(){
        wx.shareAppMessage({
            title: '我就是无聊死,也不会玩这个游戏！！！',
            imageUrl:'http://webfdh.com/way-hero/1.jpg'
        })
    }
});
