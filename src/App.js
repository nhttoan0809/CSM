import { Typography } from '@mui/material';
import './App.css';
import Tabs from './components/Tabs';
import './layout/Header';
import Layout from './layout/Layout';
import DetailComponent from './components/Detail.component'
import ConfigurationComponent from './components/Configuration.component'
import MonitorComponent from './components/Monitor.component'

function App() {
  const tabsList = [
    {
      title: 'Chi tiet',
      url: 'https://jsonplaceholder.typicode.com/posts',
      generateComponent: (data) => (
        <DetailComponent data={data}/>
      )
    },
    {
      title: 'Cau hinh',
      url: 'https://jsonplaceholder.typicode.com/albums',
      generateComponent: (data) => (
        <ConfigurationComponent data={data}/>
      )
    },
    {
      title: 'Giam sat',
      url: 'https://jsonplaceholder.typicode.com/todos',
      generateComponent: (data) => (
        <MonitorComponent data={data}/>
      )
    }
  ]

  return (
    <div className="App">
      <Layout>
        <Typography variant='h2'>Title</Typography>
        <Tabs tabsList={tabsList}/>
      </Layout>
    </div>
  );
}

export default App;
