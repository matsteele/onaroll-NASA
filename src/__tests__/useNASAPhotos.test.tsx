import {
  renderHook,
  waitFor,
  act,
  cleanup,
  RenderHookResult,
} from "@testing-library/react";

import usePhotos from "../hooks/useNASAPhotos";

import axios from "axios";
jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;
const expectedData = {
  data: {
    date: "2022-10-02",
    explanation: "test explanation",
    hdurl:
      "https://apod.nasa.gov/apod/image/2210/CannonSupernova_English_8404.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Supernova Cannon Expels Pulsar J0002",
    url: "https://apod.nasa.gov/apod/image/2210/CannonSupernova_English_960.jpg",
  },
};

let renderedHook: RenderHookResult<
  {
    photoInfo: {
      explanation: string;
      url: string;
    };
    set_date: Function;
    isLoading: boolean;
    date: string;
    error: string;
  },
  {}
>;

afterEach(cleanup);

test("outputs of hooks as expected", () => {
  const { result, unmount } = renderHook(() => usePhotos());
  //   expect(result.current.count).toBe(0);
  unmount();
  expect(typeof result.current.photoInfo).toBe("object");
  expect(typeof result.current.set_date).toBe("function");
  expect(typeof result.current.isLoading).toBe("boolean");
});

// inserting a date sets the photo info
test("hook fetches photos", async () => {
  axios.get = jest.fn().mockResolvedValue(expectedData);

  const { result, unmount } = renderHook(() => usePhotos());
  expect(result.current.date.getDay()).toBeGreaterThan(0);

  await waitFor(() => {
    result.current.set_date(new Date(`2022-10-02`));
    return expect(result.current.photoInfo.url).toBeDefined();
  });

  unmount();

  expect(typeof result.current.photoInfo.url).toBe("string");
  expect(result.current.photoInfo.explanation.length).toBeGreaterThan(0);
});

test("hook handles errors", async () => {
  const err = new Error("fetch error");

  axios.get = jest.fn().mockRejectedValue(err);

  const { result, unmount } = renderHook(() => usePhotos());

  await waitFor(() => {
    result.current.set_date(new Date(`2000-10-02`));
    expect(result.current.error.length).toBeGreaterThan(0);
  });
  unmount();
  expect(result.current.error).toBe("fetch error");
});

test("cache doesn't use call", async () => {
  axios.get = jest.fn().mockResolvedValue(expectedData);

  const { result, unmount } = renderHook(() => usePhotos());
  //   expect(result.current.count).toBe(0);

  await waitFor(() => {
    result.current.set_date(new Date(`2000-09-12`));
    expect(result.current.photoInfo.url).toBeDefined();
    expect(axios.get).toHaveBeenCalledTimes(0);
  });

  await waitFor(() => {
    result.current.set_date(new Date(`2000-09-12`));
    expect(result.current.photoInfo.url).toBeDefined();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    result.current.set_date(new Date(`2001-02-26`));
    // expect(result.current.photoInfo.url).toBeDefined();
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  await waitFor(() => {
    result.current.set_date(new Date(`2001-02-26`));
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
  unmount();
});
