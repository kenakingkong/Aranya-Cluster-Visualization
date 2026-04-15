import './App.css';
import { Cluster } from './components/cluster';

function App() {
  return (
    <div>
      <header></header>
      <main className='p-8 space-y-2'>
        <h1 className='text-5xl'>Aranya Cluster Visualization</h1>
        <Cluster />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
