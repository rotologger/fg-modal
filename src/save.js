import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    type,
    position,
    showOnPageLoad,
    delay,
    selector,
    enablePageDependent,
    pageMode,
    pageIds,
    maxWidth,
    setCookie,
    expiresAfter,
    reactToOtherCookies,
    otherCookies,
    color,
    backgroundColor,
    backdropColor,
    timingActive,
    timingMode,
    date,
  } = attributes;

  return (
    <div
      {...useBlockProps.save({
        className: `${type} hidden`,
        ...(showOnPageLoad && { "data-showonpageload": "true" }),
        ...(delay && { "data-delay": delay }),
        ...(selector && { "data-selector": selector }),
        ...(setCookie && { "data-setcookie": setCookie }),
        ...(expiresAfter && { "data-expiresafter": expiresAfter }),
        ...(enablePageDependent && { "data-pagemode": pageMode }),
        ...(enablePageDependent && pageIds && { "data-pageids": pageIds }),
        ...(reactToOtherCookies &&
          otherCookies && { "data-othercookies": otherCookies }),
        ...(timingActive && { "data-timingmode": timingMode }),
        ...(timingActive && date && { "data-date": date }),
        style: { backgroundColor: backdropColor },
      })}
    >
      <div
        className="inner"
        style={{
          maxWidth: type === "modal" ? `${maxWidth}px` : "none",
          color,
          backgroundColor,
        }}
      >
        <InnerBlocks.Content />

        <svg
          class="close-btn"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </div>
    </div>
  );
}
