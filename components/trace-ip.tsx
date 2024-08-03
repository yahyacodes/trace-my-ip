"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Separator } from "./ui/separator";

interface IPType {
  as: string;
  country: string;
  city: string;
  continent: string;
  currency: string;
  countryCode: string;
  isp: string;
  org: string;
  regionName: string;
  timezone: string;
  lat: number;
  lon: number;
}

const TraceIP = () => {
  const [isIP, setIsIP] = useState<IPType[]>([]);
  const [query, setQuery] = useState("");
  const icon = L.icon({ iconUrl: "/marker-icon.png" });

  const getIP = async () => {
    try {
      const res = await fetch(
        `http://ip-api.com/json/${query}?fields=status,message,continent,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,query`
      );
      if (!res.ok) {
        throw new Error("could not fetch data");
      }
      const data = await res.json();

      const IPObj = {
        as: data.as,
        country: data.country,
        city: data.city,
        continent: data.continent,
        currency: data.currency,
        countryCode: data.countryCode,
        isp: data.isp,
        org: data.org,
        regionName: data.regionName,
        timezone: data.timezone,
        lat: data.lat,
        lon: data.lon,
      };

      setIsIP([IPObj]);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getIP();
    console.log("Data is Fetched");
  }, []);

  return (
    <div className="flex flex-col items-center justify-between p-24 max-w-7xl">
      <div className="relative max-w-lg mt-2 min-h-fit">
        <Button className="absolute right-0" onClick={getIP}>
          Trace IP
        </Button>
        <Input
          placeholder="Trace your IP address....."
          className="w-full pr-40 pl-3 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isIP.map((ip, idx) => (
        <div key={idx} className="flex flex-col justify-between p-4">
          <div style={{ height: "40rem", width: "60rem" }}>
            <MapContainer
              center={[ip.lat, ip.lon]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
              className="rounded-3xl border"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[ip.lat, ip.lon]} icon={icon}>
                <Popup>{ip.city}</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="p-10">
            <div className="p-2">
              <h1 className="font-bold text-xl">
                as: <span className="font-normal text-md">{ip.as}</span>
              </h1>
              <Separator />
            </div>
            <div className="p-2">
              <h1 className="font-bold text-xl">
                city: <span className="font-normal text-md">{ip.city}</span>
              </h1>
              <Separator />
            </div>

            <div className="p-2">
              <h1 className="font-bold text-xl">
                continent:{" "}
                <span className="font-normal text-md">{ip.continent}</span>
              </h1>
              <Separator />
            </div>
            <div className="p-2">
              <h1 className="font-bold text-xl">
                country:{" "}
                <span className="font-normal text-md">{ip.country}</span>
              </h1>
              <Separator />
            </div>

            <div className="p-2">
              <h1 className="font-bold text-xl">
                countryCode:{" "}
                <span className="font-normal text-md">{ip.countryCode}</span>
              </h1>
              <Separator />
            </div>

            <div className="p-2">
              <h1 className="font-bold text-xl">
                currency:{" "}
                <span className="font-normal text-md">{ip.currency}</span>
              </h1>
              <Separator />
            </div>

            <div className="p-2">
              <h1 className="font-bold text-xl">
                isp: <span className="font-normal text-md">{ip.isp}</span>
              </h1>
              <Separator />
            </div>

            <div className="p-2">
              <h1 className="font-bold text-xl">
                org: <span className="font-normal text-md">{ip.org}</span>
              </h1>
              <Separator />
            </div>

            <div className="p-2">
              <h1 className="font-bold text-xl">
                regionName:{" "}
                <span className="font-normal text-md">{ip.regionName}</span>
              </h1>
              <Separator />
            </div>
            <div className="p-2">
              <h1 className="font-bold text-xl">
                timezone:{" "}
                <span className="font-normal text-md">{ip.timezone}</span>
              </h1>
              <Separator />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TraceIP;
