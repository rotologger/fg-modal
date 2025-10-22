import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  PanelBody,
  __experimentalNumberControl as NumberControl,
  TextControl,
  RangeControl,
  ToggleControl,
  RadioControl,
  SelectControl,
  DateTimePicker,
  Button,
  ButtonGroup,
  ColorPicker,
  __experimentalHeading as Heading,
} from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
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

  const slideInOuterStyle = {
    top: { paddingBottom: "12rem" },
    right: { display: "flex", justifyContent: "flex-end" },
    bottom: { paddingTop: "12rem" },
    left: { display: "flex", justifyContent: "flex-start" },
  };

  const slideInInnerStyle = {
    top: { maxWidth: "none" },
    right: {},
    bottom: { maxWidth: "none" },
    left: {},
  };

  const outerStyle =
    type === "modal"
      ? {
          padding: "3rem",
          backgroundColor: backdropColor,
        }
      : {
          ...slideInOuterStyle[position],
        };

  const innerStyle =
    type === "modal"
      ? {
          boxShadow: "1px 1px 10px 5px rgba(0, 0, 0, 0.1)",
          margin: "1rem auto",
        }
      : {
          ...slideInInnerStyle[position],
        };

  const showMaxWidth =
    type === "modal" ||
    (type === "slide-in" && (position === "left" || position === "right"));

  return (
    <>
      <InspectorControls>
        {/* POSITIONING */}
        <PanelBody title={__("Positioning", "fg-modal")}>
          <RadioControl
            label={__("Type", "fg-modal")}
            selected={type}
            options={[
              { label: "Modal", value: "modal" },
              { label: "Slide-in", value: "slide-in" },
            ]}
            onChange={(type) => setAttributes({ type })}
          />

          {type === "slide-in" && (
            <SelectControl
              label={__("Position", "fg-modal")}
              value={position}
              options={[
                { label: __("Top", "fg-modal"), value: "top" },
                { label: __("Right", "fg-modal"), value: "right" },
                { label: __("Bottom", "fg-modal"), value: "bottom" },
                { label: __("Left", "fg-modal"), value: "left" },
              ]}
              onChange={(position) => setAttributes({ position })}
            />
          )}

          {showMaxWidth && (
            <RangeControl
              label={__("Maximum width of modal content", "fg-modal")}
              value={maxWidth}
              onChange={(maxWidth) => setAttributes({ maxWidth })}
              min="200"
              max="1200"
            />
          )}
        </PanelBody>

        {/* SETUP */}
        <PanelBody title={__("Setup", "fg-modal")} initialOpen={false}>
          {/* Show on page load */}
          <ToggleControl
            label={__("Show modal on page load", "fg-modal")}
            checked={showOnPageLoad}
            onChange={() => setAttributes({ showOnPageLoad: !showOnPageLoad })}
          />

          {showOnPageLoad && (
            <NumberControl
              label={__("Show after", "fg-modal")}
              help={__("Enter time value in milliseconds", "fg-modal")}
              value={delay}
              onChange={(val) => setAttributes({ delay: val * 1 })}
              min="0"
              max="10000"
            />
          )}

          <TextControl
            label={__("Selector", "fg-modal")}
            help={__(
              "Use CSS selector to choose which HTML element should make the modal visible on click.",
              "fg-modal"
            )}
            value={selector}
            onChange={(selector) => setAttributes({ selector })}
            placeholder={__("e.g. #my-button,.my-link", "fg-modal")}
          />

          {/* Show / hide on certain pages */}
          <ToggleControl
            label={__("Show / hide modal on certain pages / posts", "fg-modal")}
            checked={enablePageDependent}
            onChange={() =>
              setAttributes({ enablePageDependent: !enablePageDependent })
            }
          />

          {enablePageDependent && (
            <>
              <ButtonGroup>
                <Button
                  isPressed={pageMode === "show"}
                  onClick={() => setAttributes({ pageMode: "show" })}
                >
                  {__("Show", "fg-modal")}
                </Button>
                <Button
                  isPressed={pageMode === "hide"}
                  onClick={() => setAttributes({ pageMode: "hide" })}
                >
                  {__("Hide", "fg-modal")}
                </Button>
              </ButtonGroup>

              <TextControl
                label={__("Pages / Posts", "fg-modal")}
                help={__(
                  "Enter the ids of pages and posts which should be affected by the setting (comma-separated).",
                  "fg-modal"
                )}
                value={pageIds}
                onChange={(pageIds) => setAttributes({ pageIds })}
                placeholder={__("e.g. 1,23,678")}
              />
            </>
          )}
        </PanelBody>

        {/* STYLING */}
        <PanelBody title={__("Styling", "fg-modal")} initialOpen={false}>
          <Heading>{__("Text Color", "fg-modal")}</Heading>
          <ColorPicker
            color={color}
            onChange={(color) => setAttributes({ color })}
          />

          <Heading>{__("Background Color", "fg-modal")}</Heading>
          <ColorPicker
            color={backgroundColor}
            onChange={(backgroundColor) => setAttributes({ backgroundColor })}
          />

          <Heading>{__("Backdrop Color", "fg-modal")}</Heading>
          <ColorPicker
            color={backdropColor}
            onChange={(backdropColor) => setAttributes({ backdropColor })}
            enableAlpha
          />
        </PanelBody>

        {/* COOKIES */}
        <PanelBody title={__("Cookies", "fg-modal")} initialOpen={false}>
          <ToggleControl
            label={__("Set cookie?", "fg-modal")}
            help={__(
              "If cookie is set, modal remembers that the current user has already seen the modal and won't show it depending what you set below."
            )}
            checked={setCookie}
            onChange={() => setAttributes({ setCookie: !setCookie })}
          />

          {setCookie && (
            <NumberControl
              label={__("Expires after", "fg-modal")}
              help={__("Enter time value in minutes", "fg-modal")}
              value={expiresAfter}
              onChange={(val) => setAttributes({ expiresAfter: val * 1 })}
              min="1"
              max="525600"
            />
          )}

          <ToggleControl
            label={__("React to other cookies?", "fg-modal")}
            help={__(
              "Should modal react according to cookies set by other plugins or services?",
              "fg-modal"
            )}
            checked={reactToOtherCookies}
            onChange={() =>
              setAttributes({ reactToOtherCookies: !reactToOtherCookies })
            }
          />

          {reactToOtherCookies && (
            <TextControl
              label={__("Other cookies", "fg-modal")}
              help={__(
                "Enter name of one or more cookies – if one of them is present on the client, the modal won't show up.",
                "fg-modal"
              )}
              value={otherCookies}
              onChange={(otherCookies) => setAttributes({ otherCookies })}
              placeholder={__("cookie1,cookie2", "fg-modal")}
            />
          )}
        </PanelBody>

        {/* TIMING */}
        <PanelBody title={__("Timing", "fg-modal")} initialOpen={false}>
          <ToggleControl
            label={__("Enable Timing?", "fg-modal")}
            help={__("Time when modal is displayed on site", "fg-modal")}
            checked={timingActive}
            onChange={() => setAttributes({ timingActive: !timingActive })}
          />

          {timingActive && (
            <>
              <ButtonGroup>
                <Button
                  isPressed={timingMode === "show"}
                  onClick={() => setAttributes({ timingMode: "show" })}
                >
                  {__("Show", "fg-modal")}
                </Button>
                <Button
                  isPressed={timingMode === "hide"}
                  onClick={() => setAttributes({ timingMode: "hide" })}
                >
                  {__("Hide", "fg-modal")}
                </Button>
              </ButtonGroup>

              <p style={{ margin: "1rem 0" }}>{__("until", "fg-modal")}</p>

              <DateTimePicker
                currentDate={date}
                onChange={(date) => setAttributes({ date })}
                is12Hour={false}
                startOfWeek={1}
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps({ style: outerStyle })}>
        <div
          className="inner"
          style={{
            maxWidth: `${maxWidth}px`,
            color,
            backgroundColor,
            ...innerStyle,
          }}
        >
          <InnerBlocks />
        </div>
      </div>
    </>
  );
}
