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