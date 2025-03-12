type Props = {};

const Search = (props: Props) => {
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <img
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <input
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />

        {/* {open && (
        <>
          {results.length > 0 ? (
            <ul className="search-result">
              {results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>

                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-result">No files found</p>
          )}
        </>
      )} */}
      </div>
    </div>
  );
};

export default Search;
