'use strict';

angular.module('localStorageServices', [])
    .factory('local', function () {

        var localStorage = {

            createActionTable: function populateDB(callback) {

                var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);

                function execute(tx){
                    tx.executeSql('DROP TABLE IF EXISTS ALERT');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ALERT (id unique, data)');
                    tx.executeSql('INSERT INTO ALERT (id, data) VALUES (1, "First row")');
                    tx.executeSql('INSERT INTO ALERT (id, data) VALUES (2, "Second row")');
                }

                function errorCB(err) {
                    callback(error);
                }

                function successCB() {
                    callback(true);
                }

                db.transaction(execute, errorCB, successCB);
            }


        };

        return localStorage;
  })
    .factory('localStorageService', function (local) {
        // Use the BackboneService by default
        var serviceToUse = local;

        return serviceToUse;
    });
