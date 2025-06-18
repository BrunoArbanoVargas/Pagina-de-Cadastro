document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const colorPalette = document.getElementById('color-palette');
    const formatSelect = document.getElementById('format');
    
    generateBtn.addEventListener('click', generatePalette);
    formatSelect.addEventListener('change', updateColorDisplay);
    
    // Gerar paleta inicial
    generatePalette();
    
    function generatePalette() {
        colorPalette.innerHTML = '';
        
        for (let i = 0; i < 5; i++) {
            const color = generateRandomColor();
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color.hex;
            colorBox.setAttribute('data-hex', color.hex);
            colorBox.setAttribute('data-rgb', color.rgb);
            colorBox.setAttribute('data-hsl', color.hsl);
            
            // Mostrar o valor no formato selecionado
            updateColorBoxText(colorBox);
            
            // Copiar para a área de transferência ao clicar
            colorBox.addEventListener('click', function() {
                copyToClipboard(colorBox);
            });
            
            colorPalette.appendChild(colorBox);
        }
    }
    
    function generateRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 40 + Math.floor(Math.random() * 40);
        
        // Converter HSL para HEX e RGB
        const hex = hslToHex(hue, saturation, lightness);
        const rgb = hslToRgb(hue, saturation, lightness);
        
        return {
            hex,
            rgb: `rgb(${rgb.join(', ')})`,
            hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)`
        };
    }
    
    function hslToHex(h, s, l) {
        const rgb = hslToRgb(h, s, l);
        return `#${rgb.map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('')}`;
    }
    
    function hslToRgb(h, s, l) {
        s /= 100;
        l /= 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        
        let r, g, b;
        
        if (h < 60) [r, g, b] = [c, x, 0];
        else if (h < 120) [r, g, b] = [x, c, 0];
        else if (h < 180) [r, g, b] = [0, c, x];
        else if (h < 240) [r, g, b] = [0, x, c];
        else if (h < 300) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];
        
        return [
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        ];
    }
    
    function updateColorDisplay() {
        const colorBoxes = document.querySelectorAll('.color-box');
        colorBoxes.forEach(updateColorBoxText);
    }
    
    function updateColorBoxText(colorBox) {
        const format = formatSelect.value;
        colorBox.textContent = colorBox.getAttribute(`data-${format}`);
    }
    
    function copyToClipboard(colorBox) {
        const format = formatSelect.value;
        const colorValue = colorBox.getAttribute(`data-${format}`);
        
        navigator.clipboard.writeText(colorValue).then(() => {
            const originalText = colorBox.textContent;
            colorBox.textContent = 'Copiado!';
            
            setTimeout(() => {
                colorBox.textContent = originalText;
            }, 1000);
        });
    }
});
