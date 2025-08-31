import { Layout } from './components/layout/Layout';

function App() {
  return (
    <Layout
      leftPanel={<div className="text-center p-8">Left Panel</div>}
      centerPanel={<div className="text-center p-8">Center Panel</div>}
      rightPanel={<div className="text-center p-8">Right Panel</div>}
    />
  );
}

export default App;