interface SavePropertyButtonProps {
  isSaved: boolean
  isPending: boolean
  onClick: () => void
}

export function SavePropertyButton({
  isSaved,
  isPending,
  onClick,
}: SavePropertyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
    </button>
  )
}
