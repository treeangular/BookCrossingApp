/**
 * Created with JetBrains WebStorm.
 * User: Javito
 * Date: 25/09/13
 * Time: 22:52
 * To change this template use File | Settings | File Templates.
 */
angular.module('logger', [])
    .provider('logIt', function(){
        // internal configuration data; configured through setter function
        this.file = 'Default';
        this.callsParseCounter = 0;
        this.isLogEnable = false;

        this.$get = function() {
            var file = this.file;
            var numberOfCalls = this.callsParseCounter;
            var isLogEnable = this.isLogEnable;
            return {
                getFile: function() {
                    return "Hello, " + file + "!"
                },

                writeLog: function(message){
                    if(this.isLogEnable)
                    {

                    }

                },
                incrementParseCounter: function()
                {
                    if(isLogEnable)
                    {
                        numberOfCalls++;
                        this.callsParseCounter = numberOfCalls;
                    }
                },

                getNumberOfCalls: function(){

                    return numberOfCalls;

                }


            }
        };
        this.setFile = function(file) {
            this.file = file;
        };
        this.setCallParseCounter = function(callsParseCounter)
        {
            this.callsParseCounter = callsParseCounter;
        };
        this.setLogEnable = function(isLogEnable)
        {
            this.isLogEnable = isLogEnable;
        }

    });

