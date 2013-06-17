/**
 * Created with JetBrains WebStorm.
 * User: hev
 * Date: 24/05/13
 * Time: 15:05
 * To change this template use File | Settings | File Templates.
 */

function getRoundedTime(dateToRound)
{
    var seconds = Math.round((new Date()-dateToRound)/1000);
    var minutes = Math.round(seconds/60);
    var hours = Math.round(minutes/60);
    var days = Math.round(hours/24);

    if(seconds < 60)
        return seconds + ' sec';
    else if(minutes < 60)
        return minutes + ' min';
    else if(hours < 24)
        return hours + ' hours';
    else
        return days + ' days';
}

function truncateString(stringToTruncate)
{
    if (stringToTruncate==null || stringToTruncate.length < 125)
        return stringToTruncate;
    else
        return stringToTruncate.substring(0, 120) + "...";
}

function createRandomNick()
{
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }

    return  "USER" + randomstring;
};
