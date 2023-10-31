export const SiteBox = ({
  src,
  alt,
  title,
  description,
  hostname,
}: {
  src: string;
  alt: string;
  title: string;
  description: string;
  hostname?: string;
}) => {
  const hasDescription =
    description && description.length > 0 && description != "No description";
  return (
    <div className="group relative overflow-hidden rounded-md border border-gray-300 bg-white shadow">
      <img
        src={src}
        alt={alt}
        className="aspect-[12/6] w-full border-b border-gray-300 bg-gray-50 object-cover"
      />
      <div className="grid flex-1 gap-1 p-3 text-left">
        {hostname && <p className="text-sm text-[#536471]">{hostname}</p>}
        <h3 className="truncate text-sm font-medium text-[#0f1419]">{title}</h3>
        {hasDescription && (
          <p className="line-clamp-2 text-sm text-[#536471]">{description}</p>
        )}
      </div>
    </div>
  );
};
