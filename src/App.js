import React from 'react';
import {Button} from 'antd'
import './App.css';

const conditions = [
  {
  label: '公司名字', value: 'name',
},
{
  label: '项目点位', value: 'point',
}
]
const App = (props) =>  {
  return (
    <div className="App">
      {conditions.map((v, index) =>  <Button key={index}>{v.label}</Button>)}
    </div>
  );
}

export default App;
