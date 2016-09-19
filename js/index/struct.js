ALLEX_CONFIGURATION = (function (execlib) {
  'use strict';
  return {
    APP: {
      environments: [{
        name: 'ticketselling',
        type: 'allexremote',
        options: {
          entrypoint: {
            address: 'localhost',
            port: 8080
          },
          datasources: [{
            name: 'notification',
            type: 'jsdata',
            options: {
            }
          }],
          commands: [{
            name: 'insertTransaction',
            options: {
              sink: '.',
              name: 'insertTransaction'
            }
          }]
        }
      }],
      resources: [{
        name: 'AngularBootstrapper',
        type: 'AngularBootstrapper',
        options: {
          angular_dependencies: []
        }
      }],
      datasources: [{
        name: 'notification',
        environment: 'ticketselling' 
      }],
      commands: [{
        command: 'insertTransaction',
        environment: 'ticketselling'
      }],
      logic: [{
        triggers : 'element.logInForm!submit',
        references : 'environment.ticketselling>login',
        handler: function (login, data){
          login ({username: data.username, password: data.password});
        }
      },{
        triggers : 'element.loggedInUI.transactionForm!submit',
        references : '.>insertTransaction',
        handler: function (insertTransaction, transactionObj){
          var combinationArray = transactionObj.combination.split(',');
          combinationArray.forEach(function(elem,index,array){
            array[index] = parseInt(elem);
          });
          insertTransaction([parseInt(transactionObj.amount),transactionObj.gamename,combinationArray]);
        },
      },{
        triggers: '.>insertTransaction',
        references: 'element.loggedInUI.transactionForm.insertTransaction.$element',
        handler: function (jqbutton, inserttransactionresult) {
          console.log('Insert transaction result:',inserttransactionresult);
          jqbutton.attr('disabled', inserttransactionresult.running ? '' : null);
        }
      }],
      links: [{
        source : 'environment.ticketselling:state',
        target : 'element.logInForm:actual',
        filter : function (state) {
          return state!=='established';
        }
      },{
        source : 'environment.ticketselling:state',
        target : 'element.loggedInUI:actual',
        filter : function (state) {
          return state==='established';
        }
      },{
        source : 'element.loggedInUI.logoutButton.$element!click',
        target : 'environment.ticketselling>logout'
      }],
      elements: [{
        name: 'logInForm',
        type: 'AngularFormLogic',
        links: [
          {
            source : '.loginButton.$element!click',
            target : '.>fireSubmit'
          },{
            source: '.:actual',
            target: 'loginButton:actual'
          }
        ],
        options : {
          elements : [
            {
              name : 'loginButton',
              type : 'WebElement'
            }
          ]
        }
      },{
        name : 'loggedInUI',
        type : 'WebElement',
        options: {
          elements: [{
            name: 'transactionForm',
            type: 'AngularFormLogic',
            links: [
              {
                source : '.insertTransaction.$element!click',
                target : '.>fireSubmit'
              },{
                source: '.:actual',
                target: 'insertTransaction:actual'
              }
            ],
            options : {
              elements : [
                {
                  name : 'insertTransaction',
                  type : 'WebElement'
                }
              ]
            }
          },{
            name : 'logoutButton',
            type : 'WebElement'
          }]
        },
        links: [{
          source: '.:actual',
          target: 'transactionForm:actual'
        },{
          source: '.:actual',
          target: 'logoutButton:actual'
        }] 
      }]
    }
  };
})(ALLEX);
