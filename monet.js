var palette;

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
            palette = {
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

function uploadFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
        let file = input.files[0]; // Get the first selected file
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let fileURL = e.target.result;
                document.getElementById("img").src = fileURL;

                generateMaterialDesignPalette(fileURL, (error, palette) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log("Material Design Palette:", palette);
            
                        document.getElementById("accent").style.backgroundColor = palette.accent;
                        document.getElementById("primary").style.backgroundColor = palette.primary;
                        document.getElementById("primaryDark").style.backgroundColor = palette.primaryDark;
                        document.getElementById("primaryLight").style.backgroundColor = palette.primaryLight;
            
                        document.getElementById("accent").innerText = palette.accent;
                        document.getElementById("primary").innerText = palette.primary;
                        document.getElementById("primaryDark").innerText = palette.primaryDark;
                        document.getElementById("primaryLight").innerText = palette.primaryLight;
            
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
            
                        document.getElementById("accent-trans").innerText = rgbaToHex(generateRGBA(palette.accent, 0.25));
                        document.getElementById("primary-trans").innerText = rgbaToHex(generateRGBA(palette.primary, 0.25));
                        document.getElementById("primaryDark-trans").innerText = rgbaToHex(generateRGBA(palette.primaryDark, 0.25));
                        document.getElementById("primaryLight-trans").innerText = rgbaToHex(generateRGBA(palette.primaryLight, 0.25));
            
                        document.getElementById("accent-trans-inter").style.backgroundColor = generateRGBA(palette.accent, 0.5);
                        document.getElementById("primary-trans-inter").style.backgroundColor = generateRGBA(palette.primary, 0.5);
                        document.getElementById("primaryDark-trans-inter").style.backgroundColor = generateRGBA(palette.primaryDark, 0.5);
                        document.getElementById("primaryLight-trans-inter").style.backgroundColor = generateRGBA(palette.primaryLight, 0.5);
            
                        document.getElementById("accent-trans-inter").innerText = rgbaToHex(generateRGBA(palette.accent, 0.5));
                        document.getElementById("primary-trans-inter").innerText = rgbaToHex(generateRGBA(palette.primary, 0.5));
                        document.getElementById("primaryDark-trans-inter").innerText = rgbaToHex(generateRGBA(palette.primaryDark, 0.5));
                        document.getElementById("primaryLight-trans-inter").innerText = rgbaToHex(generateRGBA(palette.primaryLight, 0.5));
            
                        document.getElementById("navbar").style.backgroundColor = generateRGBA(palette.accent, 0.25);
                        document.getElementById("uploadLinkButton").style.backgroundColor = generateRGBA(palette.accent, 0.25);
                        document.getElementById("uploadFileButton").style.backgroundColor = generateRGBA(palette.accent, 0.25);
                        document.getElementById("export").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            
                        document.getElementById("uploadLinkButton").addEventListener("mouseover", () => {
                            document.getElementById("uploadLinkButton").style.backgroundColor = generateRGBA(palette.accent, 0.5);
                        });
                        document.getElementById("uploadLinkButton").addEventListener("mouseout", () => {
                            document.getElementById("uploadLinkButton").style.backgroundColor = generateRGBA(palette.accent, 0.25);
                        });

                        document.getElementById("uploadFileButton").addEventListener("mouseover", () => {
                            document.getElementById("uploadFileButton").style.backgroundColor = generateRGBA(palette.accent, 0.5);
                        });
                        document.getElementById("uploadFileButton").addEventListener("mouseout", () => {
                            document.getElementById("uploadFileButton").style.backgroundColor = generateRGBA(palette.accent, 0.25);
                        });
            
                        document.getElementById("export").addEventListener("mouseover", () => {
                            document.getElementById("export").style.backgroundColor = generateRGBA(palette.accent, 0.5);
                        });
                        
                        document.getElementById("export").addEventListener("mouseout", () => {
                            document.getElementById("export").style.backgroundColor = generateRGBA(palette.accent, 0.25);
                        });
                    }
                });
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };
    input.click();
}

function openLink() {
    document.getElementById("export").style.display = "flex";

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

            document.getElementById("accent").innerText = palette.accent;
            document.getElementById("primary").innerText = palette.primary;
            document.getElementById("primaryDark").innerText = palette.primaryDark;
            document.getElementById("primaryLight").innerText = palette.primaryLight;

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

            document.getElementById("accent-trans").innerText = rgbaToHex(generateRGBA(palette.accent, 0.25));
            document.getElementById("primary-trans").innerText = rgbaToHex(generateRGBA(palette.primary, 0.25));
            document.getElementById("primaryDark-trans").innerText = rgbaToHex(generateRGBA(palette.primaryDark, 0.25));
            document.getElementById("primaryLight-trans").innerText = rgbaToHex(generateRGBA(palette.primaryLight, 0.25));

            document.getElementById("accent-trans-inter").style.backgroundColor = generateRGBA(palette.accent, 0.5);
            document.getElementById("primary-trans-inter").style.backgroundColor = generateRGBA(palette.primary, 0.5);
            document.getElementById("primaryDark-trans-inter").style.backgroundColor = generateRGBA(palette.primaryDark, 0.5);
            document.getElementById("primaryLight-trans-inter").style.backgroundColor = generateRGBA(palette.primaryLight, 0.5);

            document.getElementById("accent-trans-inter").innerText = rgbaToHex(generateRGBA(palette.accent, 0.5));
            document.getElementById("primary-trans-inter").innerText = rgbaToHex(generateRGBA(palette.primary, 0.5));
            document.getElementById("primaryDark-trans-inter").innerText = rgbaToHex(generateRGBA(palette.primaryDark, 0.5));
            document.getElementById("primaryLight-trans-inter").innerText = rgbaToHex(generateRGBA(palette.primaryLight, 0.5));

            document.getElementById("navbar").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            document.getElementById("uploadLinkButton").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            document.getElementById("export").style.backgroundColor = generateRGBA(palette.accent, 0.25);

            document.getElementById("uploadLinkButton").addEventListener("mouseover", () => {
                document.getElementById("uploadLinkButton").style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            document.getElementById("uploadLinkButton").addEventListener("mouseout", () => {
                document.getElementById("uploadLinkButton").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            document.getElementById("export").addEventListener("mouseover", () => {
                document.getElementById("export").style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            
            document.getElementById("export").addEventListener("mouseout", () => {
                document.getElementById("export").style.backgroundColor = generateRGBA(palette.accent, 0.25);
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

function rgbaToHex(rgba) {
    // Check if the input is a valid RGBA string
    const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;
  
    if (!rgbaRegex.test(rgba)) {
      return null; // Invalid input
    }
  
    // Extract RGBA values
    const [, r, g, b, a] = rgba.match(rgbaRegex);
  
    // Convert the values to hexadecimal and ensure they have two digits
    const toHex = (value) => {
      const hex = parseInt(value, 10).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    const hexR = toHex(r);
    const hexG = toHex(g);
    const hexB = toHex(b);
  
    // Convert the alpha value to a hexadecimal value (between 00 and FF)
    const alpha = Math.round(parseFloat(a) * 255);
    const hexA = toHex(alpha);
  
    // Construct the hexadecimal color string
    const hexColor = `#${hexR}${hexG}${hexB}${hexA}`;
  
    return hexColor;
}

function exportCSS(accentColour) {
    fetch("https://nadir-software.github.io/nadircss/nadir.css")
    .then(response => response.text())
    .then(data => {
        var nadirCSS = data;

        var rgbaDefault = generateRGBA(palette.accent, 0.25);
        var rgbaHover = generateRGBA(palette.accent, 0.5);

        while (nadirCSS.includes("rgba(0, 89, 255, 0.25)")) {
            nadirCSS = nadirCSS.replace("rgba(0, 89, 255, 0.25)", rgbaDefault);
        }

        while (nadirCSS.includes("rgba(0, 89, 255, 0.5)")) {
            nadirCSS = nadirCSS.replace("rgba(0, 89, 255, 0.5)", rgbaHover);
        }

        // Copy the URI to the clipboard
        navigator.clipboard.writeText(nadirCSS)
            .then(() => {
                document.getElementById("export-icon").innerText = "done";
                document.getElementById("export-text").innerText = "CSS copied to clipboard";

                setTimeout(() => {
                    document.getElementById("export-icon").innerText = "export_notes";
                    document.getElementById("export-text").innerText = "Export as custom NadirCSS";
                }, 3000);
            })
            .catch(error => {
                console.error('Error copying to clipboard:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching CSS:', error);
    });
}