// Function to generate a Material Design color palette from an image URL
function generateMaterialDesignPalette(imageURL, callback) {
    // Create an image element to load the image
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Enable cross-origin access to the image
  
    // Set up an event listener for when the image is loaded
    img.onload = function () {
        // Create a Vibrant.js object to extract colors from the image
        const vibrant = new Vibrant(img);
        const swatches = vibrant.swatches();

        // Check if swatches were successfully generated
        if (swatches) {
            // Extract Material Design color palette
            const palette = {
                accent: swatches.Vibrant.getHex(),
                primaryDark: swatches.DarkVibrant.getHex(),
                primaryLight: swatches.LightVibrant.getHex(),
                primary: swatches.Muted.getHex()
            };
  
            // Execute the callback function with the generated palette
            callback(null, palette);
        }
        
        else {
            // Error handling if swatches couldn't be generated
            callback("Failed to generate swatches", null);
        }
    };
  
    // Set the image source to the provided URL
    img.src = imageURL;
}

// Function to generate an RGBA value with a specified alpha
function generateRGBA(hex, alpha) {
    // Remove the "#" symbol if present
    hex = hex.replace(/^#/, '');

    // Parse the hex color to RGB components
    const bigint = parseInt(hex, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    // Create the RGBA string
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function openLink() {
    var imageURL = prompt("URL:");

    generateMaterialDesignPalette(imageURL, (error, palette) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Material Design Palette:", palette);

            document.getElementById("accent").style.backgroundColor = palette.accent;
            document.getElementById("primary").style.backgroundColor = palette.primary;
            document.getElementById("primaryDark").style.backgroundColor = palette.primaryDark;
            document.getElementById("primaryLight").style.backgroundColor = palette.primaryLight;

            if (calculateContrastRatio(palette.accent) < 4.5) {
                document.getElementById("accent").style.color = "black";
            }

            if (calculateContrastRatio(palette.primary) < 4.5) {
                document.getElementById("primary").style.color = "black";
            }

            if (calculateContrastRatio(palette.primaryDark) < 4.5) {
                document.getElementById("primaryDark").style.color = "black";
            }

            if (calculateContrastRatio(palette.primaryLight) < 4.5) {
                document.getElementById("primaryLight").style.color = "black";
            }

            document.getElementById("accent-trans").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            document.getElementById("primary-trans").style.backgroundColor = generateRGBA(palette.primary, 0.25);
            document.getElementById("primaryDark-trans").style.backgroundColor = generateRGBA(palette.primaryDark, 0.25);
            document.getElementById("primaryLight-trans").style.backgroundColor = generateRGBA(palette.primaryLight, 0.25);

            document.getElementById("navbar").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            document.getElementById("uploadButton").style.backgroundColor = generateRGBA(palette.accent, 0.25);

            document.getElementById("uploadButton").addEventListener("mouseover", () => {
                document.getElementById("uploadButton").style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            document.getElementById("uploadButton").addEventListener("mouseout", () => {
                document.getElementById("uploadButton").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });
        }
    });

    document.getElementById("img").src = imageURL;
}

function hexToRgb(hex) {
    // Convert a hex color to RGB values
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function getRelativeLuminance(rgb) {
    // Calculate relative luminance
    const [r, g, b] = rgb.map((c) => {
        const sRGB = c / 255;
        return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrastRatio(background) {
    var foreground = "#ffffff";

    if (foreground && background) {
        // Calculate contrast ratio
        const fgRgb = hexToRgb(foreground);
        const bgRgb = hexToRgb(background);
    
        const fgLuminance = getRelativeLuminance(fgRgb);
        const bgLuminance = getRelativeLuminance(bgRgb);
    
        var contrastRatio = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);

        return contrastRatio;
    }
}