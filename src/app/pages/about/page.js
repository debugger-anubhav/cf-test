"use client";
import React from "react";
import About from "@/components/About/About";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const AboutPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="large_layout">
          <About />
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default AboutPage;
