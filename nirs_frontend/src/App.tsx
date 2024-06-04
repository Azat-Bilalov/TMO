import * as React from "react";

import "./App.css";
import { getKnowledgeBaseStatus } from "./api/knowledgeBase";
import { UploadYAMLPage } from "./pages/UploadYAMLPage";
import { ViewMetagraphPage } from "./pages/ViewMetagraphPage/ViewMetagraphPage";

function App() {
  const [toggle, setToggle] = React.useState<boolean>(false);

  const handleToggle = React.useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  React.useEffect(() => {
    getKnowledgeBaseStatus()
      .then(({ status }) => {
        if (status === 200) {
          setToggle(true);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [handleToggle]);

  return (
    <div className="App">
      {toggle ? (
        <ViewMetagraphPage onToggle={handleToggle} />
      ) : (
        <UploadYAMLPage onToggle={handleToggle} />
      )}
    </div>
  );
}

export default App;
