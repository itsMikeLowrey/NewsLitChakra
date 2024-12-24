"use client";
import CTA from "../components/CTA";
import NavBar from "../components/NavBar";
import Chat from "../components/chat";
export default function WithSubnavigation() {
  return (
    <div>
      <NavBar />
      <CTA />
      <Chat />
    </div>
  );
}
