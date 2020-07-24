import React, { useState } from 'react';

const CopyToClipboardButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copyTextToClipboard = () => {
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
  };
  return (
    <button onClick={copyTextToClipboard}>
      {!copied ? 'Copy URL' : 'Copied!'}
    </button>
  );
};

export default CopyToClipboardButton;
