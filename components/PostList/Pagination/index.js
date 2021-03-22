import PaginationStyles from "@styles/Pagination.module.css";
import Link from "next/link";
import ChevronLeft from "./svg/ChevronLeft";
import ChevronRight from "./svg/ChevronRight";

/**
 * Stateless component that reacts to props passed in
 * from PostList
 */
export default function Pagination(props) {
  const { totalPages, currentPage, prevDisabled, nextDisabled } = props;

  /**
   * Build up the page numbers to show in the DOM
   * Add an active class to the <li> that represents
   * the current page number
   */
  function renderPageNumbers(totalPages) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      const listItemclasses =
        currentPage === i
          ? `${PaginationStyles.pagination__listItem} ${PaginationStyles.pagination__listItem__active}`
          : PaginationStyles.pagination__listItem;

      pageNumbers.push(
        <li key={`page-${i}`} className={listItemclasses}>
          <Link href={`/blog?page=${i}`}>
            <a>Page {i}</a>
          </Link>
        </li>,
      );
    }

    return pageNumbers;
  }

  /**
   * Render page numbers in an <ol>
   *
   * Use <Link /> component for active links
   * Replace <Link /> with <span> using same CSS classes when next or previous
   * navigation is disabled
   *
   * Accessibility considerations
   *
   * Titles of links are 'Page x' rather than just 'x' to avoid needing to enhance screen-reader
   * readability with e.g. link titles
   *
   * Use Chevrons for decorative effect, use aria-hidden=true so they don't interrupt
   * the flow on screen readers
   *
   * Mobile-first considerations
   *
   * All page numbers are on a separate row in the UI to maintain the minimum required click area
   * required by WCAG (44px) https://www.w3.org/WAI/WCAG22/Understanding/pointer-target-spacing.html
   * on all screen sizes regardless of number of pages.
   */

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
            <Link href={`/blog?page=${currentPage - 1}`}>
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

        {renderPageNumbers(totalPages)}

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
            <Link href={`/blog?page=${currentPage + 1}`}>
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
