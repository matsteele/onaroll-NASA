import { IPhotoInfo } from "../hooks/useNASAPhotos";

export default function InfoBox({ photoInfo }: { photoInfo: IPhotoInfo }) {
  return (
    <div>
      <div>info</div>
      <div>
        <title>{photoInfo.title}</title>
        <p>{photoInfo.explanation}</p>
      </div>
    </div>
  );
}
