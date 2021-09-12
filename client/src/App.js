
import './App.css';
import {Container} from "@material-ui/core"
import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';
import env from "react-dotenv";

import GooglePicker from "react-google-picker";

const scope = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.photos.readonly"
];


function App() {

  const [profile,setProfile]=useState(false);

// const responseGoogle = (response) => {
//   console.log(response);
//   console.log(response.profileObj);
//   if(response.profileObj !== undefined){
//     setProfile(true);
//   }
// }


  return (
    <Container>
      
      {/* {!profile ?
       <GoogleLogin
    clientId={CLIENT_ID}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  : "Thala"} */}

<GooglePicker
        clientId={env.CLIENT_ID}
        developerKey={env.API_KEY}
        scope={scope}
        // onAuthFailed={this.onAuthFail}
        navHidden
        mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
        createPicker={(google, oauthToken) => {
          const picker = new google.picker.PickerBuilder()
            .addView(new google.picker.View(google.picker.ViewId.DOCS_IMAGES))
            .addView(new google.picker.DocsUploadView())
            .setOAuthToken(oauthToken)
            .setDeveloperKey(env.API_KEY)
            .setAppId(env.APP_ID)
            .setCallback((data) => {
              if (data.action === google.picker.Action.PICKED) {
                var fileId = data.docs[0].id;
                alert("The user selected: " + fileId);
              }
            })
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED);

          picker.build().setVisible(true);
        }}
      >
        <button>
         Continue with google
        </button>
      </GooglePicker>



    </Container>
  );
}

export default App;
