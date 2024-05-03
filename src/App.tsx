import { cnApp } from './App.classname';

import { CountryDetails } from './components/CountryDetails/CountryDetails';

const App = () => {
  return (
    <div className={cnApp()}>
      <CountryDetails />
    </div>
  );
}

export { App };
