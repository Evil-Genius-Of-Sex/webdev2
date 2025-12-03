document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById("firstButton");
    const counter = document.getElementById("somePTag");
    
    if (!image || !counter) {
        console.error("Could not find image or counter element");
        return;
    }
    
    image.addEventListener("click", function() {
        // Update counter
        const currentValue = parseInt(counter.dataset.kirks);
        const newValue = currentValue + 1;
        counter.dataset.kirks = newValue;
        counter.textContent = newValue + " Kirks";
        
        // Reset and apply wobble animation to image
        image.style.animation = 'none';
        void image.offsetWidth; // Trigger reflow
        image.style.animation = 'wobble 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both';
        
        // Apply click pulse effect
        image.classList.add("click-pulse");
        
        // Apply pop animation to counter
        counter.classList.add("counter-pop");
        
        // Remove classes after animations complete
        setTimeout(() => {
            image.classList.remove("click-pulse");
            counter.classList.remove("counter-pop");
        }, 700);
        
        console.log("Kirks:", newValue);
    });
    
    // Remove animation after it completes to allow it to run again
    image.addEventListener('animationend', function() {
        image.style.animation = '';
    });
});