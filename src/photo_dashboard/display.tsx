import Loading from "./loading";

export default function display({
  url,
  isLoading,
  error,
}: {
  url: string;
  isLoading: boolean;
  error: string;
}) {
  const ErrorNote = ({ error }: { error: string }) => (
    <div className="center">error in retreiving data {error}</div>
  );
  const isImage = () => url && url.includes(".jpg");
  const isVideo = () => url && url.includes("youtube");
  if (isLoading) return <Loading />;
  else if (isImage()) return <img src={url} alt="nasa" />;
  else if (isVideo())
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
  else if (error && error.length) return <ErrorNote error={error} />;
  else return <ErrorNote error="" />;
}
