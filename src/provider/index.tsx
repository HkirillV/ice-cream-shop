import { Provider } from "react-redux";
import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
    </Provider>
  );
};

export default Index;
