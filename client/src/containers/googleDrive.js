/* eslint-disable eqeqeq */
import React, { PureComponent } from "react";
import { Segment, Button, Header } from "semantic-ui-react";
import env from "react-dotenv";

import GooglePicker from "react-google-picker";

const scope = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.photos.readonly",
];

class GoogleDrive extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <Segment centered>
        {/* get from env */}
        <Header as="h4" block>
          Upload the images to your Google Drive
        </Header>
        <br></br>
        <br></br>
        <div className="google">
        <GooglePicker
          clientId={env.CLIENT_ID}
          developerKey={env.API_NEW}
          scope={scope}
          onChange={(data) => console.log("on change:", data)}
          onAuthFailed={(data) => console.log("on auth failed:", data)}
          multiselect={true}
          navHidden={true}
          authImmediate={false}
          viewId={"DOCS"}
          mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
          createPicker={(google, oauthToken) => {
            const googleViewId = google.picker.ViewId.DOCS;
            const uploadView = new google.picker.DocsUploadView();
            const docsView = new google.picker.DocsView(googleViewId)
              .setIncludeFolders(true)
              .setSelectFolderEnabled(true);

            const picker = new window.google.picker.PickerBuilder()
              .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
              .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
              .addView(docsView)
              .addView(uploadView) /*DocsUploadView added*/
              .setOAuthToken(oauthToken)
              .setDeveloperKey(env.API_NEW)
              .setCallback((data) => {
                if (data.action == google.picker.Action.PICKED) {
                  var fileId = data.docs[0].id;
                  alert("The user selected: " + fileId);
                  picker();
                }
              });
            picker.build().setVisible(true);
          }}
        >
          <Button content="Upload to Google Drive" icon="google drive" labelPosition="right" primary/>
        </GooglePicker>
        </div>
      </Segment>
    );
  }
}

export { GoogleDrive };
