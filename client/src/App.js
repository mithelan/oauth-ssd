import "./App.css";
import { Container } from "@material-ui/core";
import { Tab } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { GoogleDrive } from "./containers/googleDrive";
import { Header, Icon } from "semantic-ui-react";

function App() {
  return (
    <Container>
      <Header as="h2" icon textAlign="center">
        <Icon name="cloud upload" color="orange" circular />
        <Header.Content>OAuth Application</Header.Content>
      </Header>

      <Tab
        menu={{ secondary: true, pointing: true }}
        color="orange"
        panes={[
          {
            menuItem: "Google Drive",
            render: () => (
              <Tab.Pane>
                <GoogleDrive />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "LinkedIn",
            render: () => (
              <Tab.Pane>
                <GoogleDrive />
              </Tab.Pane>
            ),
          },
        ]}
      />
    </Container>
  );
}

export default App;
