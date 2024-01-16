import Activity from './Activity/Activity';
import './App.css';
import Chat from './Chat UI/Chat';
import ChatListHistory from './ChatListHistory/ChatListHistory';
import Home from './Home Screen/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />}/>
        <Route path='/activity' element={<Activity />} />
        <Route path='/chatlisthistory' element={<ChatListHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
