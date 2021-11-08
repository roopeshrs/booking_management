import './App.css';
import Navbar from './components/Navbar/Navbar';
import Menubar from './components/Menubar/Menubar';
import Slider from './components/Slider/Slider';
import Request from './components/status/Request';
import Service from './components/status/Service';
import Payment from './components/status/Payment';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter> 
      <Navbar/>
      <Menubar/>
      <Slider/> 
      <Route exact path="/">
        <Request/>
      </Route>   
      <Route path="/service">
        <Service/>
      </Route>   
      <Route path="/payment">
        <Payment/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
