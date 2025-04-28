/**
 * Contrast Validator for Accessibility
 * This script validates color contrast ratios according to WCAG standards.
 */

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
}

// Calculate relative luminance for RGB values
function getLuminance(rgb) {
    // Convert RGB values to the 0-1 range
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;
    
    // Apply the formula for relative luminance
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
    const lum1 = getLuminance(hexToRgb(color1));
    const lum2 = getLuminance(hexToRgb(color2));
    
    // Determine the lighter and darker luminance
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    // Calculate contrast ratio: (L1 + 0.05) / (L2 + 0.05)
    return (lighter + 0.05) / (darker + 0.05);
}

// Determine if the contrast meets WCAG standards
function meetsWCAGStandards(ratio, level = 'AA', isLargeText = false) {
    if (level === 'AA') {
        return isLargeText ? ratio >= 3 : ratio >= 4.5;
    } else if (level === 'AAA') {
        return isLargeText ? ratio >= 4.5 : ratio >= 7;
    }
    return false;
}

// Test our specific color palette
function validateColorPalette() {
    // Our color palette
    const colors = {
        deepBlueGreen: '#264653',
        turquoise: '#2A9D8F',
        pastelYellow: '#E9C46A',
        pastelOrange: '#F4A261',
        coral: '#E76F51',
        white: '#FFFFFF',
        black: '#000000',
        darkBg: '#1a202c'
    };
    
    console.log('=== COLOR CONTRAST VALIDATION ===');
    
    // Test text colors on background colors
    const testCombinations = [
        { fg: colors.deepBlueGreen, bg: colors.white, name: 'Deep Blue-Green on White' },
        { fg: colors.white, bg: colors.deepBlueGreen, name: 'White on Deep Blue-Green' },
        { fg: colors.turquoise, bg: colors.white, name: 'Turquoise on White' },
        { fg: colors.white, bg: colors.turquoise, name: 'White on Turquoise' },
        { fg: colors.coral, bg: colors.white, name: 'Coral on White' },
        { fg: colors.white, bg: colors.coral, name: 'White on Coral' },
        { fg: colors.deepBlueGreen, bg: colors.pastelYellow, name: 'Deep Blue-Green on Pastel Yellow' },
        { fg: colors.deepBlueGreen, bg: colors.pastelOrange, name: 'Deep Blue-Green on Pastel Orange' },
        { fg: colors.white, bg: colors.darkBg, name: 'White on Dark Background' },
        { fg: colors.turquoise, bg: colors.darkBg, name: 'Turquoise on Dark Background' },
        { fg: colors.pastelYellow, bg: colors.darkBg, name: 'Pastel Yellow on Dark Background' },
        { fg: colors.pastelOrange, bg: colors.darkBg, name: 'Pastel Orange on Dark Background' },
        { fg: colors.coral, bg: colors.darkBg, name: 'Coral on Dark Background' }
    ];
    
    // Test each combination
    for (const combo of testCombinations) {
        const ratio = getContrastRatio(combo.fg, combo.bg);
        const passAA = meetsWCAGStandards(ratio, 'AA', false);
        const passAALarge = meetsWCAGStandards(ratio, 'AA', true);
        const passAAA = meetsWCAGStandards(ratio, 'AAA', false);
        const passAAALarge = meetsWCAGStandards(ratio, 'AAA', true);
        
        console.log(`${combo.name}:`);
        console.log(`  Contrast Ratio: ${ratio.toFixed(2)}`);
        console.log(`  WCAG AA (Normal text): ${passAA ? 'PASS' : 'FAIL'}`);
        console.log(`  WCAG AA (Large text): ${passAALarge ? 'PASS' : 'FAIL'}`);
        console.log(`  WCAG AAA (Normal text): ${passAAA ? 'PASS' : 'FAIL'}`);
        console.log(`  WCAG AAA (Large text): ${passAAALarge ? 'PASS' : 'FAIL'}`);
        console.log('---');
    }
}

// Run validation when the page loads
document.addEventListener('DOMContentLoaded', validateColorPalette); 