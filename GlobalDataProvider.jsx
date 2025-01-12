import React, {createContext, useState} from 'react';

export const DataContext = createContext();

const GlobalDataProvider = ({children}) => {
  const [userName, setUserName] = useState(``); // user name

  const [list, setList] = useState([]); // All task  list Array

  const [task, setTask] = useState(``); // actual user each task data

  const [completed, setCompleted] = useState([]);

  return (
    <DataContext.Provider
      value={{
        userName,
        setUserName,
        list,
        setList,
        task,
        setTask,
        completed,
        setCompleted,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default GlobalDataProvider;