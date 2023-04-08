import React from 'react';
import firebase from './firebase';
import { useList } from 'react-firebase-hooks/database';

function Table() {
  const [data, loading, error] = useList(firebase.database().ref('Data/chartT/1'));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Temperature</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.key}>
            <td>{item.val().temperature}</td>
            <td>{item.val().time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
