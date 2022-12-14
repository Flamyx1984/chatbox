import React, { useEffect } from "react";
import ChatBot from "./ChatBot";
import "./App.css";
import { ContextProvider } from "./components/Context";

export default function App(props) {
  useEffect(() => {
    fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    )
      .then((res) => res.json())
      .then((data) => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
      })
      .catch((err) => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
      });
  }, []);

  return (
    <div>
      <ContextProvider>
        <ChatBot />
      </ContextProvider>
    </div>
  );
}
