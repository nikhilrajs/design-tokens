import * as React from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronsUpDownIcon,
} from 'lucide-react';

// ─── SortIcon ─────────────────────────────────────────────────────────────────
// Shared by DataTable and AdvancedDataTable — was duplicated identically in both.

export const SortIcon = ({
  direction,
}: {
  direction: 'asc' | 'desc' | false;
}) => {
  const active =
    'shrink-0 size-[var(--pcs-table-head-sort-icon-size)] text-[color:var(--pcs-table-head-sort-icon-color-active)]';
  const idle =
    'shrink-0 size-[var(--pcs-table-head-sort-icon-size)] text-[color:var(--pcs-table-head-sort-icon-color)]';
  if (direction === 'asc') return <ChevronUpIcon className={active} />;
  if (direction === 'desc') return <ChevronDownIcon className={active} />;
  return <ChevronsUpDownIcon className={idle} />;
};

interface ColumnHeaderSearchProps {
  label: string;
  canSort: boolean;
  sorted: 'asc' | 'desc' | false;
  onSortToggle?: React.MouseEventHandler<HTMLButtonElement>;
  canFilter: boolean;
  filterValue: string;
  onFilterChange: (value: string) => void;
  leadingAction?: React.ReactNode;
  trailingAction?: React.ReactNode;
}

export const ColumnHeaderSearch = ({
  label,
  canSort,
  sorted,
  onSortToggle,
  canFilter,
  filterValue,
  onFilterChange,
  leadingAction,
  trailingAction,
}: ColumnHeaderSearchProps) => {
  const inputId = React.useId();

  return (
    <div className="group flex items-center gap-1 min-w-0 pt-2">
      {leadingAction}

      {canFilter ? (
        <div className="flex-1 min-w-0">
          <input
            id={inputId}
            type="text"
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder=" "
            className="peer block w-full min-w-0 bg-transparent outline-none normal-case
              text-[length:var(--pcs-text-body-sm-size)] text-[color:var(--pcs-table-head-search-input-color)]
              font-normal tracking-normal pb-1
              border-0 border-b-1 border-solid border-[color:var(--pcs-table-head-search-underline-color)]
              transition-colors focus:border-[color:var(--pcs-table-head-search-underline-color-focus)]"
          />
          <label
            htmlFor={inputId}
            data-content={label}
            className="block max-h-0 pointer-events-none select-none
              before:content-[attr(data-content)] before:inline-block before:max-w-full before:truncate
              before:origin-top-left before:[backface-visibility:hidden]
              before:normal-case before:leading-tight
              before:text-[length:var(--pcs-table-head-font-size)] before:font-[var(--pcs-table-head-font-weight)]
              before:text-[color:var(--pcs-table-head-color)] before:tracking-[var(--pcs-table-head-letter-spacing)]
              before:transition-transform before:duration-200 before:ease-out
              peer-placeholder-shown:before:-translate-y-[1.6em] peer-placeholder-shown:before:scale-100
              peer-focus:before:-translate-y-[2.9em] peer-focus:before:scale-[0.82]
              peer-focus:before:normal-case peer-focus:before:font-medium peer-focus:before:tracking-normal
              peer-focus:before:text-[color:var(--pcs-table-head-search-label-color-float)]
              peer-[&:not(:placeholder-shown)]:before:-translate-y-[2.9em] peer-[&:not(:placeholder-shown)]:before:scale-[0.82]
              peer-[&:not(:placeholder-shown)]:before:normal-case peer-[&:not(:placeholder-shown)]:before:font-medium
              peer-[&:not(:placeholder-shown)]:before:tracking-normal
              peer-[&:not(:placeholder-shown)]:before:text-[color:var(--pcs-table-head-search-label-color-float)]"
          >
            <span className="sr-only">{label}</span>
          </label>
        </div>
      ) : (
        <span className="flex-1 truncate">{label}</span>
      )}

      {canSort && (
        <button
          onClick={onSortToggle}
          className="shrink-0 p-0.5 cursor-pointer select-none hover:text-[color:var(--pcs-table-head-color-hover)]"
          aria-label={`Sort by ${label}`}
        >
          <SortIcon direction={sorted} />
        </button>
      )}

      {trailingAction}
    </div>
  );
};
