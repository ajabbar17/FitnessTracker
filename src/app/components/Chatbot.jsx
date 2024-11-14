"use client";
import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Function to load the Botpress Webchat script
    const loadBotpressScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    loadBotpressScript("https://cdn.botpress.cloud/webchat/v2.1/inject.js");
    loadBotpressScript("https://mediafiles.botpress.cloud/dc14d139-8724-4735-b1ea-82e68c039c55/webchat/v2.1/config.js");

    return () => {
      const injectScript = document.querySelector(`script[src="https://cdn.botpress.cloud/webchat/v2.1/inject.js"]`);
      const configScript = document.querySelector(`script[src="https://mediafiles.botpress.cloud/dc14d139-8724-4735-b1ea-82e68c039c55/webchat/v2.1/config.js"]`);

      if (injectScript) injectScript.remove();
      if (configScript) configScript.remove();
    };
  }, []);

  return null; 
};

export default Chatbot;
