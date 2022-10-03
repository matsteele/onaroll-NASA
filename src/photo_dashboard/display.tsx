import { IPhotoInfo } from "../hooks/useNASAPhotos";

export default function display({
  url,
  isLoading,
}: {
  url: string;
  isLoading: boolean;
}) {
  const isImage = () => url && url.includes(".jpg");
  const isVideo = () => url && url.includes("youtube");

  if (isLoading) return <div>isLoading</div>;

  if (isImage()) return <img src={url} alt="nasa image" />;
  if (isVideo())
    return (
      <iframe
        width="960"
        height="540"
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      />
    );
  else return <div>error</div>;
}
