import React, { createContext, useState, useEffect } from 'react';

// Create the WaitingListContext
export const WaitingListContext = createContext();

// Define the WaitingListProvider component
const WaitingListProvider = ({ children }) => {
  const [hasJoinedWaitingList, setHasJoinedWaitingList] = useState(() => {
    // Retrieve the initial state from LocalStorage
    const storedValue = localStorage.getItem('hasJoinedWaitingList');
    return storedValue === 'true';
  });

  // Update LocalStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('hasJoinedWaitingList', hasJoinedWaitingList);
  }, [hasJoinedWaitingList]);

  const joinWaitingList = () => {
    setHasJoinedWaitingList(true);
  };

  return (
    <WaitingListContext.Provider value={{ hasJoinedWaitingList, joinWaitingList }}>
      {children}
    </WaitingListContext.Provider>
  );
};

export default WaitingListProvider;
