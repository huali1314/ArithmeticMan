/**
 * Created by chu on 2017/8/18 0018.
 */
const PlayerData = function () {
    var that = {};
    that.uid = 0;
    that.finishQuestiontotalNum = 0;//回答问题总数
    that.rightQuestionTotalNum = 0;
    that.wrongQuestionTotalNum = 0;
    return that;
};
export default PlayerData;
