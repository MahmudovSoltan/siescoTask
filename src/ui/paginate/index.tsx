import ReactPaginate from "react-paginate";
import "./css/pagination.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: { selected: number }) => void;
  forcePage?: number;
}

const Paginations = ({ pageCount, onPageChange, forcePage }: PaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={"⬅"}
      nextLabel={"➡"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={forcePage}
      containerClassName="pagination-container"
      activeClassName="active-page"
    />
  );
};

export default Paginations;