import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useNASAPhotos from "../hooks/useNASAPhotos";
import { Dashboard } from "./styles";
import Display from "./display";

import InfoBox from "./InfoBox";

export default function NASAPhoto() {
  const { date, set_date, photoInfo, error, isLoading } = useNASAPhotos();
  return (
    <Dashboard className="dashboard">
      <header className="date-header" data-testid="date-picker">
        <DatePicker
          selected={new Date(date)}
          onChange={(date: Date) => set_date(date)}
          maxDate={new Date()}
        />
      </header>

      <main>
        <Display url={photoInfo.url} isLoading={isLoading} error={error} />
        <InfoBox photoInfo={photoInfo} />
      </main>
    </Dashboard>
  );
}
