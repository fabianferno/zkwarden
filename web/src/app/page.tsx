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
  height: "30vh",
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
                  <section className="lg:max-w-5xl lg:w-full">
                    <form className="p-2 border-zinc-800 border-t-[1px]">
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-3">
                          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200 mt-2">
                            1) Create a farcaster group
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-400">
                            Enter details to set up a location restricted group
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 sm:col-start-1">
                              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                Latitude
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  disabled
                                  defaultValue={marker.lat.toFixed(6)}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 dark:bg-zinc-900"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                Longitude
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  disabled
                                  defaultValue={marker.lng.toFixed(6)}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 dark:bg-zinc-900"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                Proximity (meters)
                              </label>
                              <div className="mt-2">
                                <input
                                  defaultValue={50}
                                  type="number"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 dark:bg-zinc-900"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1 mt-5">
                            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Paste your farcaster group invite link here
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 dark:bg-zinc-900"
                              />
                            </div>
                          </div>

                          <div className="mt-5 flex justify-between items-center">
                            <LoadScript
                              googleMapsApiKey={
                                process.env.NEXT_PUBLIC_MAP_KEY || ""
                              }
                            >
                              <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                zoom={10}
                                center={center}
                                onClick={handleClick}
                                onLoad={onLoad}
                              >
                                <Marker position={marker}></Marker>
                              </GoogleMap>
                            </LoadScript>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-end gap-x-6">
                        <button
                          type="submit"
                          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          Create
                        </button>
                      </div>
                    </form>

                    <div className="mt-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                        2) Copy this NFT collection link and configure it in
                        your group
                      </label>
                      <div className="mt-2 flex justify-center items-center">
                        <Input
                          className="bg-zinc-800"
                          type="text"
                          disabled
                          value={
                            "https://opensea.io/collection/the-wizards-hat"
                          }
                        />
                        <Button
                          variant={"outline"}
                          className="ml-2 bg-zinc-800 text-gray-900 dark:text-gray-200"
                          onClick={() => {
                            navigator.clipboard.writeText("");
                          }}
                        >
                          Copy to clipboard
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                        3) Share this farcaster group invite link
                      </label>
                      <div className="mt-2 flex justify-center items-center">
                        <Input
                          className="bg-zinc-800"
                          type="text"
                          disabled
                          value={"https://zkwarden.vercel.app/share/group123"}
                        />
                        <Button
                          variant={"outline"}
                          className="ml-2 bg-zinc-800 text-gray-900 dark:text-gray-200"
                          onClick={() => {
                            navigator.clipboard.writeText("");
                          }}
                        >
                          Copy to clipboard
                        </Button>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
