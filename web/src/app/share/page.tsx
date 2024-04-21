"use client";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ModeToggle } from "@/components/ui/mode-toggle";
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const libraries = ["places"]; // Include places library for better user experience

const center = { lat: 37.7749, lng: -122.4194 }; // Set initial center coordinates (San Francisco)

const mapContainerStyle = {
  width: "100%",
  height: "40vh",
  border: "2px solid #ccc",
  borderRadius: "10px",
};

export default function Home() {
  const account = useAccount();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState({ lat: center.lat, lng: center.lng });
  const handleClick = (event: google.maps.MapMouseEvent) => {
    const [lat, lng] = [event.latLng!.lat(), event.latLng!.lng()];

    setMarker({ lat, lng });
    console.log("Latitude:", lat.toFixed(6), "Longitude:", lng.toFixed(6));
  };
  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  return (
    <main className="container flex min-h-screen flex-col items-center justify-center p-10">
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>
      <div className="relative flex place-items-center">
        <Image
          className="relative mr-10"
          src="/giphy.gif"
          alt="Karma Logo"
          width={180}
          height={180}
          priority
        />
        <div className="">
          <div className="text-3xl font-bold">zkWarden</div>
          <div className="text-lg w-[300px]">
            Tool to help you create zkProof gated group chats on Farcaster
          </div>
        </div>
      </div>

      <section className="lg:max-w-5xl lg:w-full mt-10">
        <div className="ring-1 ring-zinc-700 rounded-xl p-8 w-full">
          {!account?.address ? (
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-md mb-5">
                Connect your wallet to get started
              </h3>
              <ConnectButton />
            </div>
          ) : (
            <div className="flex justify-center items-start flex-col">
              <div className="flex w-full justify-center items-center">
                <ConnectButton />
              </div>

              {account?.address && (
                <div className="mt-5 flex justify-center items-between flex-col w-full">
                  <h1>
                    Verify that you are authorized to be a part of this group.
                  </h1>

                  <div className="mt-5">
                    <Button
                      onClick={() => {
                        console.log("clicked");
                        // TODO: Get the user's location and verify it against risc zero verifier contract
                      }}
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
