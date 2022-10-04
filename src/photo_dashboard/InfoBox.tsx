import { useState } from "react";
import { IPhotoInfo } from "../hooks/useNASAPhotos";
import { InfoButton, InfoBoxContainer } from "./styles";

export default function InfoBox({ photoInfo }: { photoInfo: IPhotoInfo }) {
  const [isOpen, set_isOpen] = useState(false);
  return (
    <InfoBoxContainer isopen={isOpen.toString()}>
      {photoInfo.explanation && (
        <>
          <InfoButton
            data-testid="infobutton"
            isopen={isOpen.toString()}
            onClick={() => set_isOpen((isO) => !isO)}
          >
            {isOpen ? "x" : "info"}
          </InfoButton>

          <div className="infotext" data-testid="infotext">
            <header>{photoInfo.title}</header>
            <p>{photoInfo.explanation}</p>
          </div>
        </>
      )}
    </InfoBoxContainer>
  );
}
