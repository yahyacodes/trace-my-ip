import dynamic from "next/dynamic";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

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
  const googleLLCIP: IPType = {
    as: "AS15169 Google LLC",
    country: "United States",
    city: "Ashburn",
    continent: "North America",
    currency: "USD",
    countryCode: "US",
    isp: "Google LLC",
    org: "Google Public DNS",
    regionName: "Virginia",
    timezone: "America/New_York",
    lat: 39.03,
    lon: -77.5,
  };

  const [isIP, setIsIP] = useState<IPType>(googleLLCIP);
  const [query, setQuery] = useState("8.8.8.8");
  const icon = L.icon({ iconUrl: "/marker-icon.png" });

  const getIP = async () => {
    try {
      const res = await fetch(
        `http://ip-api.com/json/${query}?fields=status,message,continent,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,query`
      );
      if (!res.ok) {
        throw new Error("Could not fetch data");
      }
      const data = await res.json();

      const IPObj: IPType = {
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

      setIsIP(IPObj);
      setQuery(data.query);
      console.log(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="py-16">
      <div className="relative max-w-xl mt-5 min-h-fit mb-5 mx-auto shadow-lg shadow-primary/10">
        <Button className="absolute right-0" onClick={getIP}>
          Trace IP
        </Button>
        <Input
          placeholder="Trace your IP address....."
          className="w-full pr-40 pl-3 py-2 bg-white text-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isIP && (
        <div>
          <div className="map-container">
            <MapContainer
              key={`${isIP.lat}-${isIP.lon}`}
              center={[isIP.lat, isIP.lon]}
              zoom={13}
              scrollWheelZoom={false}
              className="rounded-3xl border"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[isIP.lat, isIP.lon]} icon={icon}>
                <Popup>
                  {isIP.city}, {isIP.country}
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="container mx-auto bg-white p-4 rounded-md mt-10 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 shadow-lg shadow-primary/10">
            <div className="p-2">
              <h1 className="font-normal text-md">Continent</h1>
              <span className="font-bold text-2xl text-primary">
                {isIP.continent}
              </span>
            </div>

            <div className="p-2">
              <h1 className="font-normal text-md">Country</h1>
              <span className="font-bold text-2xl text-primary">
                {isIP.country}
              </span>
            </div>

            <div className="p-2">
              <h1 className="font-normal text-md">Region Name</h1>
              <span className="font-bold text-2xl text-primary">
                {isIP.regionName}
              </span>
            </div>

            <div className="p-2">
              <h1 className="font-normal text-md">City</h1>
              <span className="font-bold text-2xl text-primary">
                {isIP.city}
              </span>
            </div>
          </div>

          <div className="p-10 container bg-white rounded-md mt-10 shadow-lg shadow-primary/10">
            <div className="grid md:grid-cols-2 grid-cols-1 p-2">
              <h1 className="text-xl text-primary">AS</h1>
              <span className="text-xl flex justify-end">{isIP.as}</span>
            </div>
            <Separator />

            <div className="grid md:grid-cols-2 grid-cols-1 p-2">
              <h1 className="text-xl text-primary">Country Code</h1>
              <span className="text-xl flex justify-end">
                {isIP.countryCode}
              </span>
            </div>
            <Separator />

            <div className="grid md:grid-cols-2 grid-cols-1 p-2">
              <h1 className="text-xl text-primary">Currency</h1>
              <span className="text-xl flex justify-end">{isIP.currency}</span>
            </div>
            <Separator />

            <div className="grid md:grid-cols-2 grid-cols-1 p-2">
              <h1 className="text-xl text-primary">ISP</h1>
              <span className="text-xl flex justify-end">{isIP.isp}</span>
            </div>
            <Separator />

            <div className="grid md:grid-cols-2 grid-cols-1 p-2">
              <h1 className="text-xl text-primary">Organization</h1>
              <span className="text-xl flex justify-end">{isIP.org}</span>
            </div>
            <Separator />

            <div className="grid md:grid-cols-2 grid-cols-1 p-2">
              <h1 className="text-xl text-primary">TimeZone</h1>
              <span className="text-xl flex justify-end">{isIP.timezone}</span>
            </div>
            <Separator />
          </div>
        </div>
      )}
    </div>
  );
};

export default TraceIP;
