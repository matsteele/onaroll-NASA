import {
  renderHook,
  waitFor,
  act,
  cleanup,
  RenderHookResult,
} from "@testing-library/react";

import usePhotos from "../hooks/useNASAPhotos";

import axios from "axios";

// jest.mock("axios");
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

// beforeEach(() => {
//   renderedHook =
// });

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
  const { result, unmount } = renderHook(() => usePhotos());
  //   console.log("renderedHook", renderedHook);
  expect(result.current.date.length).toBe(0);

  axios.get = jest.fn().mockResolvedValue(expectedData);

  await waitFor(() => {
    result.current.set_date(`2022-10-02`);
    return expect(result.current.photoInfo.url).toBeDefined();
  });

  unmount();

  expect(typeof result.current.photoInfo.url).toBe("string");
  expect(result.current.photoInfo.explanation.length).toBeGreaterThan(0);
});

// test("hook fetches photos ", async () => {
//   let _result;
//   await act(async () => {
//     const { result, unmount } = await renderHook(() => usePhotos());
//     _result = result;
//   });

//   expect(_result.current.date.length).toBe(0);
//   axios.get = jest.fn().mockResolvedValue(expectedData);
//   await waitFor(() => {
//     result.current.set_date(`2022-10-02`);
//     return expect(result.current.photoInfo.url).toBeDefined();
//   });
//   expect(typeof result.current.photoInfo.url).toBe("string");
//   expect(result.current.photoInfo.explanation.length).toBeGreaterThan(0);
// });

// test("hook handles errors", async () => {
//   const { result } = renderedHook;
//   expect(result.current.date.length).toBe(0);

//   const err = new Error("fetch error");

//   axios.get = jest.fn().mockRejectedValue(err);
//   act(() => {
//     result.current.set_date(`20pp-10-02`);
//   });

//   await waitFor(() => expect(result.current.error.length).toBeGreaterThan(0));

//   expect(result.current.error).toBe("fetch error");
// });

// the output for the photoURL is loading while fetching
// when you set a date you photoURL has a length

// test("loading set while data fetching", async () => {
//     // const  = renderedHook;
//     const { result } = renderHook(() => usePhotos());
//     expect(result.current.date.length).toBe(0);

//     axios.get = jest.fn().mockResolvedValue(expectedData);

//     act(() => {
//       result.current.set_date(`2022-10-02`);
//     });

//     await waitFor(() => expect(result.current.isLoading).toBe(true));
//     expect(typeof result.current.date).toBeDefined();
//     expect(typeof result.current.photoInfo.url).toBeUndefined();

//   });

// should hold a cache for response data
// test("hook fetches photos", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => usePhotos());
//     //   expect(result.current.count).toBe(0);

//     act(() => {
//         result.current.set_date(`2022-10-02`)
//       });

//     expect(result.current.photoInfo.url).toBeUndefined();

//     await waitForNextUpdate();

//     console.log('result.current.photoInfo', result.current.photoInfo)

//     expect(typeof result.current.photoInfo.url).toBe("string");
//     expect(result.current.photoInfo.explanation.length).toBeGreaterThan(0);

//   });

// const spyConsole = jest
//   .spyOn(console, "error")
//   .mockImplementation(() => {});
