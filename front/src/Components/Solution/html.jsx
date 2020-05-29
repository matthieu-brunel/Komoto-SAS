import React from "react";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>My seo app</title>
        <meta name="description" content="testing react helmet" />
        <meta name="keywords" content="react,seo,helmet" />
      </Helmet>
      <h1>Hello react</h1>
      <h2>This is app route</h2>
    </div>
  );
}

export default App;