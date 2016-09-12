import React from 'react';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

var Login = React.createClass({
  render: function() {
    return (

        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
     (error, result) => {
       if (error) {
         alert("login has error: " + result.error);
       } else if (result.isCancelled) {
         alert("login is cancelled.");
       } else {

         AccessToken.getCurrentAccessToken().then(
           (data) => {
             let accessToken = data.accessToken
             alert(accessToken.toString())

             const responseInfoCallback = (error, result) => {
               if (error) {
                 console.log(error)
                 alert('Error fetching data: ' + error.toString());
               } else {
                 console.log(result)
                 alert('Success fetching data: ' + result.toString());
               }
             }

             const infoRequest = new GraphRequest(
               '/me',
               {
                 accessToken: accessToken,
                 parameters: {
                   fields: {
                     string: 'email,name,first_name,middle_name,last_name'
                   }
                 }
               },
               this.responseInfoCallback
             );

             // Start the graph request.
             new GraphRequestManager().addRequest(infoRequest).start()

           }
         )

       }
     }
   }
   onLogoutFinished={() => alert("logout.")}/>

    );
  }
});


export default Login;
