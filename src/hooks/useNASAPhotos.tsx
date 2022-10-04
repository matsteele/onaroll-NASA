import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const CACHE: Cache = {} as Cache; // for caching the requests in browser, only use the api when necessary

export default function useNASAPhotos() {
  const [date, set_date] = useState(new Date());
  const [photoInfo, set_photoInfo] = useState({} as IPhotoInfo);
  const [isLoading, set_Loading] = useState(false);
  const [error, set_error] = useState("");

  const dateFormatted = format(date);

  const APIkey = "HnKGwhlgqB1cfPUEfj1rxQrc8C56Il2HAq8SPAGc";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${APIkey}&date=${dateFormatted}`;

  const fetchNASAPhotoData = useCallback(async () => {
    set_Loading(true);
    set_error("");
    if (dateFormatted.length) {
      try {
        const response = await axios.get(url);
        const nasaPhotoInfo = {
          explanation: response.data.explanation,
          title: response.data.title,
          url: response.data.url,
        };
        set_photoInfo({
          explanation: nasaPhotoInfo.explanation,
          title: nasaPhotoInfo.title,
          url: nasaPhotoInfo.url,
        });
        CACHE[dateFormatted] = nasaPhotoInfo;
      } catch (error: unknown) {
        const { message } = error as Error;
        set_error(message);
      } finally {
        set_Loading(false);
      }
    }
  }, [dateFormatted, url]);

  useEffect(() => {
    if (dateFormatted in CACHE) {
      set_photoInfo(CACHE[dateFormatted]);
    } else fetchNASAPhotoData();

    // return
  }, [dateFormatted, fetchNASAPhotoData]);

  return { set_date, date, photoInfo, isLoading, error };
}

function format(inputDate: Date) {
  let date, month, year, day;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  day = date.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export interface IPhotoInfo {
  title: string;
  explanation: string;
  url: string;
}

type Cache = Record<string, IPhotoInfo>;
