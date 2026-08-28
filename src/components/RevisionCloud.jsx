// A scalloped revision cloud, the mark drafters use on a blueprint to
// circle something that was corrected after the original drawing. Used
// only on the two PS whose category/theme we actually corrected from the
// source data (SIH26221, SIH26200) — the device carries real information,
// not decoration.
export default function RevisionCloud({ children }) {
  return (
    <span className="relative inline-flex items-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 120 32"
        className="absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+16px)]"
        preserveAspectRatio="none"
      >
        <path
          d="M4 16 a4 4 0 1 1 8 -3 a4 4 0 1 1 9 -2 a4 4 0 1 1 9 1 a4 4 0 1 1 9 -1 a4 4 0 1 1 9 2
             a4 4 0 1 1 9 1 a4 4 0 1 1 9 -1 a4 4 0 1 1 9 2 a4 4 0 1 1 9 0
             a4 4 0 1 1 -9 3 a4 4 0 1 1 -9 -1 a4 4 0 1 1 -9 1 a4 4 0 1 1 -9 -1
             a4 4 0 1 1 -9 1 a4 4 0 1 1 -9 -2 a4 4 0 1 1 -9 1 a4 4 0 1 1 -9 -2 a4 4 0 1 1 -8 1"
          fill="none"
          stroke="#FF6B35"
          strokeWidth="1.1"
          strokeOpacity="0.85"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  )
}
