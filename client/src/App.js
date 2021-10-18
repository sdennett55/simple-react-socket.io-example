import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'; 
import SockJsClient from 'react-stomp';

function App() {

  // React-Stomp library

  let clientRef = null

  const handleMsgSTOMP = (msg, topic)=> {
    console.log('STOMP: \t\t' + msg.time + "\t" + msg.text)
  }

  const handleDisconnectSTOMP = () =>  {
    console.log("Disconnecting STOMP connection")
    clientRef.disconnect();
  }

  const handleReconnectSTOMP = () =>  {
    console.log("Reconnecting STOMP connection")
    clientRef.connect();
  }

  // Socket.io library

  let socket = null

  useEffect(() => {
        // connect to the socket server
        socket = io('http://localhost:8081/chat', {
          transports: ['polling', 'websocket']
        });
    
        socket.on('connect', function () {
          console.log('The client has connected with the server');
        });
    
        socket.on('chat', function (data) {
          // console.log(socket)
          console.log('Socket.io: \t' + data.time, "\t", data.text);
            
        });
        
      }, []);

  const handleDisconnectSocketIo = () => {
    console.log("Disconnecting Socket.io connection")
    socket.disconnect()
  }

  const handleReconnectSocketIo = () => {
    console.log("Reconnecting Socket.io connection")
    socket.connect()
  }


  return (
    <div>
      <div>
        <button onClick={handleDisconnectSTOMP}>Disconnect STOMP</button>
      </div>
      <div>
        <button onClick={handleReconnectSTOMP}>ReConnect STOMP</button>
      </div>
      <div>
        <button onClick={handleDisconnectSocketIo}>Disconnect Socket.io</button>
      </div>
      <div>
        <button onClick={handleReconnectSocketIo}>ReConnect Socket.io</button>
      </div>
      <div>
        <SockJsClient url={ "http://localhost:8080/chat" } topics={["/topic/chat"]} 
            onMessage={handleMsgSTOMP} ref={ (client) => { clientRef = client }}
            debug={ false }/>
      </div>
    </div>
  );
}

export default App;
