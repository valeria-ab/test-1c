import React, { useEffect, useState } from 'react';
import './App.css';
import {CustomizedTables} from './CustomizedTables';
import axios from 'axios';

type StatusType = "new" | "completed" | "assigned_to" | "started" | "declined"
type OrderTypeNameType = "Безвозвратное изъятие документов" | "Доставка клиенту" | "Вывоз коробов"

type ItemType = {
  id: number
  oguid: string
  status: StatusType
  order_type: {
    name: OrderTypeNameType
    oguid: string
  },
  terminal: {
    name: string
    oguid: string
  },
  account: {
    name: string
    oguid: string
  },
  created_user: {
    surname: string
    name: string
    patronymic: string
    oguid: string
  }
  created_date: number
}

export type DataResponceType = Array<ItemType> 



function App() {


  const [data, setData] = useState<DataResponceType>([])
  useEffect(() => {
    axios.get<DataResponceType>('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9f15021c-fcd4-4657-aff4-2782f62b60b6/test_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211111T163236Z&X-Amz-Expires=86400&X-Amz-Signature=908421b8fa5757518857ff6d247ae635cb2dde669cfff184dcbe05566bc434ce&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22test_data.json%22')
      .then((res) => {
        setData(res.data)
      })
  }, [])

  return (
    <div className="App">
       <CustomizedTables data={data}/> 
    </div>
  );
}

export default App;
