import React from 'react';
import './QrLoginComponent.css'; // Create this CSS file based on the provided styles

const QrLogin = () => {
  return (
    <div className="container">
      <h2 id="figtree-heading">Scan the QR code below to login</h2>
      <p>
        <img id="qr-code" src={require('./image.png')} alt="QR Code" />
      </p>
      <a className="btn btn-success" href="">Login</a>
    </div>
  );
};

export default QrLogin;
