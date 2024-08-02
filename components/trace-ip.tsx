"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  const icon = L.icon({ iconUrl: "/maker-icon.png" });

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
          <h1>as: {ip.as}</h1>
          <h1>city: {ip.city}</h1>
          <h1>continent: {ip.continent}</h1>
          <h1>country: {ip.country}</h1>
          <h1>countryCode: {ip.countryCode}</h1>
          <h1>currency: {ip.currency}</h1>
          <h1>isp: {ip.isp}</h1>
          <h1>org: {ip.org}</h1>
          <h1>regionName: {ip.regionName}</h1>
          <h1>timezone: {ip.timezone}</h1>
        </div>
      ))}
    </div>
  );
};

export default TraceIP;
