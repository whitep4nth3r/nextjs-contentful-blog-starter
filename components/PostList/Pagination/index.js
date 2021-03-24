import PaginationStyles from "@styles/Pagination.module.css";
import Link from "next/link";
import ChevronLeft from "./svg/ChevronLeft";
import ChevronRight from "./svg/ChevronRight";

export default function Pagination(props) {
  const { totalPages, currentPage, prevDisabled, nextDisabled } = props;

  const prevPage = parseInt(currentPage, 10) - 1;
  const nextPage = parseInt(currentPage, 10) + 1;

  return (
    <div className={PaginationStyles.pagination}>
      <ol className={PaginationStyles.pagination__list}>
        <li className={PaginationStyles.pagination__listItem}>
          {prevDisabled && (
            <span className={PaginationStyles.pagination__listItem__disabled}>
              <span
                className={PaginationStyles.pagination__chevronContainer__left}
              >
                <ChevronLeft />
              </span>
              <span>Previous page</span>
            </span>
          )}
          {!prevDisabled && (
            <Link href={`/blog/page/${prevPage}`}>
              <a>
                <span
                  className={
                    PaginationStyles.pagination__chevronContainer__left
                  }
                >
                  <ChevronLeft />
                </span>
                <span>Previous page</span>
              </a>
            </Link>
          )}
        </li>
        <li
          className={`${PaginationStyles.pagination__listItem} ${PaginationStyles.pagination__listItem__pageDescriptor}`}
        >
          Page {currentPage} of {totalPages}
        </li>
        <li className={PaginationStyles.pagination__listItem}>
          {nextDisabled && (
            <span className={PaginationStyles.pagination__listItem__disabled}>
              <span>Next page</span>
              <span
                className={PaginationStyles.pagination__chevronContainer__right}
              >
                <ChevronRight />
              </span>
            </span>
          )}
          {!nextDisabled && (
            <Link href={`/blog/page/${nextPage}`}>
              <a>
                <span>Next page</span>
                <span
                  className={
                    PaginationStyles.pagination__chevronContainer__right
                  }
                >
                  <ChevronRight />
                </span>
              </a>
            </Link>
          )}
        </li>
      </ol>
    </div>
  );
}
