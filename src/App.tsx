import { Header, Travel } from './components';

const App = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Sistema de Compras de Boletos</h1>
        <Travel />
      </div>
    </>
  );
};

export default App;
