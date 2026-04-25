interface PropertyPaginationProps {
  pageNumber: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

export function PropertyPagination({
  pageNumber,
  totalPages,
  onPrevious,
  onNext,
}: PropertyPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={pageNumber <= 1}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm text-slate-300">
        Page {pageNumber} of {Math.max(totalPages, 1)}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={totalPages > 0 && pageNumber >= totalPages}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
