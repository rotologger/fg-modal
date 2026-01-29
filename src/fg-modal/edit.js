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
	TextareaControl,
} from "@wordpress/components";
import metadata from "./block.json";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const {
		showOnPageLoad,
		delay,
		selector,
		maxWidth,
		setCookie,
		expiresAfter,
		type,
		position,
		closeAdditionalActions,
	} = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Options", metadata.textdomain)}
					initialOpen={true}
				>
					<RadioControl
						label={__("Type", metadata.textdomain)}
						selected={type}
						options={[
							{ label: "Modal", value: "modal" },
							{ label: "Slide-in", value: "slide-in" },
						]}
						onChange={(type) => setAttributes({ type })}
					/>

					{type === "slide-in" && (
						<RadioControl
							label={__("Position", metadata.textdomain)}
							selected={position}
							options={[
								{ label: "Top", value: "top" },
								{ label: "Bottom", value: "bottom" },
							]}
							onChange={(position) => setAttributes({ position })}
						/>
					)}

					<ToggleControl
						label={__("Show modal on page load", metadata.textdomain)}
						checked={showOnPageLoad}
						onChange={() => setAttributes({ showOnPageLoad: !showOnPageLoad })}
					/>

					{showOnPageLoad && (
						<NumberControl
							label={__("Show after", metadata.textdomain)}
							help={__("Enter time value in milliseconds", metadata.textdomain)}
							value={delay}
							onChange={(val) => setAttributes({ delay: val * 1 })}
							min="0"
							max="10000"
						/>
					)}

					<TextControl
						label={__("Selector", metadata.textdomain)}
						help={__(
							"Use CSS selector to choose which HTML element should make the modal visible on click.",
						)}
						value={selector}
						onChange={(selector) => setAttributes({ selector })}
						placeholder={__("e.g. #my-button, .my-link", metadata.textdomain)}
					/>

					<RangeControl
						label={__("Maximum width of modal content", metadata.textdomain)}
						value={maxWidth}
						onChange={(maxWidth) => setAttributes({ maxWidth })}
						min="200"
						max="1200"
					/>

					<ToggleControl
						label={__("Set cookie?", metadata.textdomain)}
						checked={setCookie}
						onChange={() => setAttributes({ setCookie: !setCookie })}
					/>

					{setCookie && (
						<NumberControl
							label={__("Expires after", metadata.textdomain)}
							help={__("Enter time value in minutes", metadata.textdomain)}
							value={expiresAfter}
							onChange={(val) => setAttributes({ expiresAfter: val * 1 })}
							min="1"
							max="525600"
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div
					className="inner"
					style={{ maxWidth: `${maxWidth}px`, margin: "1rem auto" }}
				>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
