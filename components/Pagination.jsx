const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className={`mr-2 px-2 py-1 ${
          page === 1
            ? "border border-gray-300"
            : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
        } rounded-lg `}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>

      <button
        className={`cursor-pointer mr-2 px-2 py-1 rounded-lg ${
          page === totalPages
            ? "border border-gray-300"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }  `}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
