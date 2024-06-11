import './App.scss';
import Header from './component/Header/Header';
import { Link } from 'react-router-dom';

const App = () => {

  return (
    <div className="app-container">
      <Header />
      <div>
        Link
        <div>
          <button>
          <Link to="/users">den user</Link>
          </button>
          <button>
          <Link to="/admins">den admin</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
