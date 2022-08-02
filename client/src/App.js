import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Header from "./components/Header";
import Clients from "./components/Clients";
import Projects from "./components/Projects";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const apollo_client = new ApolloClient({
  uri: `${API_SERVER}/graphql`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={apollo_client}>
        <Header />
        <div className="container">
          <Projects />
          <hr />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
