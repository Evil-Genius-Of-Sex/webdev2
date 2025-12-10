document.addEventListener('DOMContentLoaded', function() {
    // Game state
    let kirks = 0;
    let tylerRobinsons = 0;
    let tylerCost = 25;
    let decimalAccumulator = 0; // Track decimal parts
    
    // DOM elements
    const kirkImage = document.getElementById("kirkButton");
    const counter = document.getElementById("counter");
    const buyTylerButton = document.getElementById("buyTyler");
    const tylerCountDisplay = document.getElementById("tylerCount");
    const tylerCostDisplay = document.getElementById("tylerCost");
    const tylerProductionDisplay = document.getElementById("tylerProduction");
    
    // Initialize game
    updateDisplays();
    
    // Start auto-clicker interval (per second for smoother income)
    let autoClickerInterval = setInterval(function() {
        if (tylerRobinsons > 0) {
            // Each Tyler Robinson generates 0.5 Kirks per second
            // Add to decimal accumulator
            decimalAccumulator += (tylerRobinsons * 0.5);
            
            // Check if we have accumulated enough for a whole Kirk
            if (decimalAccumulator >= 1) {
                const wholeKirks = Math.floor(decimalAccumulator);
                kirks += wholeKirks;
                decimalAccumulator -= wholeKirks; // Keep only the remainder
                
                updateDisplays();
                
                // Smooth counter animation for auto-generated Kirks
                if (wholeKirks > 0) {
                    animateCounterIncrease(wholeKirks);
                }
            }
        }
    }, 1000); // Every second
    
    // Kirk click handler
    kirkImage.addEventListener("click", function() {
        kirks++;
        updateDisplays();
        animateClick();
    });
    
    // Buy Tyler Robinson handler
    buyTylerButton.addEventListener("click", function() {
        if (kirks >= tylerCost) {
            kirks -= tylerCost;
            tylerRobinsons++;
            tylerCost = Math.floor(tylerCost * 1.3);
            
            updateDisplays();
            animatePurchase();
        }
    });
    
    // Update all displays
    function updateDisplays() {
        // Always show whole numbers only
        counter.textContent = Math.floor(kirks) + " Kirks";
        tylerCountDisplay.textContent = tylerRobinsons;
        tylerCostDisplay.textContent = tylerCost + " Kirks";
        tylerProductionDisplay.textContent = (tylerRobinsons * 0.5).toFixed(1) + "/sec";
        buyTylerButton.disabled = kirks < tylerCost;
        
        // Update button text
        buyTylerButton.innerHTML = kirks >= tylerCost ? 
            `Buy for <span id="tylerCost">${tylerCost}</span> Kirks` : 
            `Need ${tylerCost - Math.floor(kirks)} More Kirks`;
    }
    
    // Improved click animation
    function animateClick() {
        // Enhanced wobble animation
        kirkImage.classList.remove("wobble");
        void kirkImage.offsetWidth; // Trigger reflow
        kirkImage.classList.add("wobble");
        
        // Add click pulse effect
        kirkImage.classList.remove("click-pulse");
        void kirkImage.offsetWidth;
        kirkImage.classList.add("click-pulse");
        
        // Counter pop animation
        counter.classList.remove("counter-pop");
        void counter.offsetWidth;
        counter.classList.add("counter-pop");
        
        // Remove animations after they complete
        setTimeout(() => {
            kirkImage.classList.remove("wobble");
            kirkImage.classList.remove("click-pulse");
            counter.classList.remove("counter-pop");
        }, 700);
        
        console.log("Kirks:", Math.floor(kirks), "Tyler Robinsons:", tylerRobinsons, "Decimals:", decimalAccumulator.toFixed(2));
    }
    
    // Purchase animation
    function animatePurchase() {
        buyTylerButton.classList.remove("counter-pop");
        void buyTylerButton.offsetWidth;
        buyTylerButton.classList.add("counter-pop");
        
        // Add purchase glow effect
        const upgradeItem = buyTylerButton.closest('.upgrade-item');
        upgradeItem.style.animation = 'none';
        void upgradeItem.offsetWidth;
        upgradeItem.style.animation = 'purchaseGlow 0.8s ease-out';
        
        setTimeout(() => {
            buyTylerButton.classList.remove("counter-pop");
        }, 400);
    }
    
    // Smooth counter increase animation for auto-generated Kirks
    function animateCounterIncrease(amount) {
        // Subtle pulse effect when income is generated
        counter.classList.remove("income-pulse");
        void counter.offsetWidth;
        counter.classList.add("income-pulse");
        
        // Create a visual indicator for auto-generated Kirks
        if (amount > 0) {
            createAutoKirkEffect(amount);
        }
        
        setTimeout(() => {
            counter.classList.remove("income-pulse");
        }, 300);
    }
    
    // Create auto-kirk effect
    function createAutoKirkEffect(amount) {
        const counterRect = counter.getBoundingClientRect();
        const effect = document.createElement('div');
        effect.className = 'auto-kirk-effect';
        effect.textContent = `+${amount}`;
        effect.style.cssText = `
            position: fixed;
            left: ${counterRect.left + counterRect.width - 100}px;
            top: ${counterRect.top + 20}px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #51cf66;
            text-shadow: 0 0 10px rgba(81, 207, 102, 0.5);
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transform: translateY(0);
            animation: autoKirkFloat 1.5s ease-out;
        `;
        
        document.body.appendChild(effect);
        
        // Remove after animation
        setTimeout(() => {
            effect.remove();
        }, 1500);
    }
    
    // Clean up interval on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(autoClickerInterval);
    });
});