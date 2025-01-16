class CompareFrame {

    constructor(image2_id, slider_id) {
        this.slider = document.getElementById(slider_id);
        this.image2 = document.getElementById(image2_id);
        this.isDragging = false;

        this.image2.draggable = false;

        this.moveSlider = (e) => {
            if (this.isDragging) {
                const containerRect = this.slider.parentElement.getBoundingClientRect();
                const x = e.clientX - containerRect.left;
        
                // Limit the slider to stay within the container bounds
                if (x >= 0 && x <= containerRect.width) {
                    this.slider.style.left = `${x}px`;
                    this.image2.style.clipPath = `inset(0 0 0 ${x}px)`;
                }
            }
        }

        this.slider.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.moveSlider(e);
            document.addEventListener('mousemove', this.moveSlider);
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            document.removeEventListener('mousemove', this.moveSlider);
        });
        
        // Optional: Handle touch events for mobile devices
        this.slider.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.moveSlider(e.touches[0]);
            document.addEventListener('touchmove', (e) => this.moveSlider(e.touches[0]));
        });
        
        document.addEventListener('touchend', () => {
            this.isDragging = false;
            document.removeEventListener('touchmove', (e) => this.moveSlider(e.touches[0]));
        });
        
    }  
}

new CompareFrame("beard-after", "beard-slider")
new CompareFrame("man-hair-after", "man-hair-slider")
new CompareFrame("woman-hair-after", "woman-hair-slider")
