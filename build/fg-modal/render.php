<?php
// => $type, $position, $showOnPageLoad, $delay, $selector, $maxWidth, $setCookie, $expiresAfter
extract($attributes);
?>

<div <?php echo get_block_wrapper_attributes([
            'class' => ($type === 'modal' ? 'modal' : 'slide-in ' . $position) . ' ' . 'hidden',
            ...($showOnPageLoad ? ['data-showonpageload' => $showOnPageLoad] : []),
            ...($delay ? ['data-delay' => $delay] : []),
            ...(isset($selector) ? ['data-selector' => $selector] : []),
            ...($setCookie ? ['data-setcookie' => $setCookie] : []),
            ...($expiresAfter ? ['data-expiresafter' => $expiresAfter] : []),
        ]); ?>>
    <div class="inner" <?php echo $type === 'modal' ? ' style="max-width: ' . $maxWidth . 'px"' : ''; ?>>
        <?php echo $content; ?>
        <svg class="close-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
    </div>
</div>