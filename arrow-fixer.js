/**
 * Arrow Fixer Script
 * This script ensures that arrow indicators in column headers are displayed correctly
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Arrow fixer script loaded');
    
    // Function to check and update arrow visibility
    function checkArrows() {
        // Get all fixed arrows
        const upArrows = document.querySelectorAll('.fixed-arrow-up');
        const downArrows = document.querySelectorAll('.fixed-arrow-down');
        
        // First hide all arrows that should be hidden
        upArrows.forEach(arrow => {
            if (arrow.style.display !== 'inline-block') {
                arrow.style.display = 'none';
            }
        });
        
        downArrows.forEach(arrow => {
            if (arrow.style.display !== 'inline-block') {
                arrow.style.display = 'none';
            }
        });
        
        // Ensure parent elements have position relative for proper arrow positioning
        document.querySelectorAll('th').forEach(th => {
            if (th.querySelector('.fixed-arrow-up, .fixed-arrow-down')) {
                if (window.getComputedStyle(th).position === 'static') {
                    th.style.position = 'relative';
                }
                
                // Make sure the span containing arrows is at the left
                const span = th.querySelector('span');
                if (span) {
                    span.style.float = 'left';
                    span.style.marginRight = '5px';
                    span.style.display = 'inline-block';
                    span.style.verticalAlign = 'middle';
                }
            }
        });
    }
    
    // Run initially
    checkArrows();
    
    // Set up a mutation observer to watch for changes to the DOM
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                checkArrows();
            }
        });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
        attributes: true,
        subtree: true,
        attributeFilter: ['style', 'class']
    });
    
    // Also run on window resize as table layout might change
    window.addEventListener('resize', checkArrows);
    
    // Force run after a small delay to make sure styles are applied
    setTimeout(checkArrows, 100);
    
    console.log('Arrow fixer initialization complete');
}); 