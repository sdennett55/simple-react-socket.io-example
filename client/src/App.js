import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'; 

// storing socket connection in this global variable
let socket = null;

function handleClick() {
  // we emit this event that increments the count on the server
  // and the updated count is emitted back via 'counter updated'
  socket.emit('counter clicked');
}

function App() {
  const [count, setCount] = useState(0); 

  // after component mount...
  useEffect(() => {
    // connect to the socket server
    socket = io('ws://localhost:5000');

    // when connected, look for when the server emits the updated count
    socket.on('counter updated', function(countFromServer) {
      // set the new count on the client
      setCount(countFromServer);
    })
    
  }, []);
  return (
    <button onClick={handleClick}>Counter: {count}</button>
  );
}

export default App;
