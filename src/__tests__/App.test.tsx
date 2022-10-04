import {
  render,
  screen,
  cleanup,
  waitFor,
  findByTestId,
  renderHook,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import App from "../photo_dashboard";

import axios from "axios";
import useNASAPhotos from "../hooks/useNASAPhotos";
import Display from "../photo_dashboard/display";
import InfoBox from "../photo_dashboard/InfoBox";

jest.mock("axios");

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

let AppRendered: any;
beforeEach(async () => {
  axios.get = jest.fn().mockResolvedValue(expectedData);
  AppRendered = render(<App />);
  // await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  await screen.findByText("info");
});

afterEach(cleanup);

test("datePicker Rendered", () => {
  const linkElement = screen.getByTestId("date-picker");
  expect(linkElement).toBeInTheDocument();
});

test("Should display loading message and disappear when posts arrive", async () => {
  const LoadingComponent = render(<Display url={""} isLoading={true} />);
  const spinner = LoadingComponent.getByTestId("loadingspinner");
  expect(spinner).toBeInTheDocument();
});

test("Button should change opacity on infoBox", async () => {
  const user = userEvent.setup();
  const button = screen.getByTestId("infobutton");
  const text = screen.getByTestId("infotext");

  expect(text).toHaveStyle("opacity:0");
  await user.click(button);
  expect(text).toHaveStyle("opacity: 1");
  await user.click(button);
  expect(text).toHaveStyle("opacity: 0");
});
