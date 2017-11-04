/* global angular */
angular.module('api.users', [])
    .factory('Users', function() {
        var Users = {};
        var userList = [{
                id: '1',
                name: 'Jane',
                role: 'Designer',
                location: 'New York',
                twitter: 'gijane'
            },
            {
                id: '2',
                name: 'Bob',
                role: 'Developer',
                location: 'New York',
                twitter: 'billybob'
            },
            {
                id: '3',
                name: 'Jim',
                role: 'Developer',
                location: 'Chicago',
                twitter: 'jimbo'
            },
            {
                id: '4',
                name: 'Bill',
                role: 'Designer',
                location: 'LA',
                twitter: 'dabill'
            }
        ];

        Users.all = function() {
            return userList;
        };

        Users.findById = function(id) {
            if (!userList) {
                return userList.find(function(user) {
                    return user.id === id;
                });
            }

            // return userList[userList.indexOf(id)];

            // function isBigEnough(element) {
            //     return element >= 15;
            // }

            // [12, 5, 8, 130, 44].find(isBigEnough); // 130
        };

        return Users;

    });
