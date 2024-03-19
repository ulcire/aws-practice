const ContentFormatter = ({ content }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return (
    <p className="text-sm text-gray-600 mb-1 break-words">
      {parts.map((part, index) =>
        urlRegex.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </p>
  );
};

export default ContentFormatter;
