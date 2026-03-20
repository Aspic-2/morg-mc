// Minecraft Server IP and Port
const serverIP = 'morgmc.ddns.net';
// Port is used in API, but usually hidden in display unless needed
const serverDisplayIP = 'morgmc.ddns.net'; 

// 1. Function to Copy IP to Clipboard
function copyIP() {
    navigator.clipboard.writeText(serverIP).then(() => {
        const ipTextSpan = document.getElementById('ip-text');
        const originalText = ipTextSpan.innerText;
        
        // Visual Feedback
        ipTextSpan.innerText = 'Copied! Have fun!';
        ipTextSpan.style.color = '#10b981'; // Green color
        
        // Reset after 2 seconds
        setTimeout(() => {
            ipTextSpan.innerText = originalText;
            ipTextSpan.style.color = ''; // Reset to CSS color
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy IP: ', err);
    });
}

// 2. Fetch Server Status and Players
function updateServerStatus() {
    const playerCountSpan = document.getElementById('player-count');
    const statusDot = document.querySelector('.dot');
    const playersListGrid = document.getElementById('players-list');

    // Call our backend API
    fetch('/api/status')
        .then(res => res.json())
        .then(data => {
            if (data.online) {
                // Update player count
                playerCountSpan.innerText = `${data.players.online} / ${data.players.max}`;
                statusDot.style.background = '#10b981'; // Online Green
                statusDot.style.boxShadow = '0 0 10px #10b981';

                // Update Player List
                if (data.players.list && data.players.list.length > 0) {
                    playersListGrid.innerHTML = ''; // Clear loading/old players
                    
                    // Limit to display max 10 players for performance/cleanliness
                    const playersToShow = data.players.list.slice(0, 10);
                    
                    playersToShow.forEach(playerName => {
                        // Create player card using Minotar for skins (helm only)
                        const playerCard = `
                            <div class="player-card fade-in">
                                <img src="https://minotar.net/helm/${playerName}/40.png" alt="${playerName}">
                                <span class="name">${playerName}</span>
                            </div>
                        `;
                        playersListGrid.innerHTML += playerCard;
                    });
                    
                    if (data.players.list.length > 10) {
                        playersListGrid.innerHTML += `<div style="color:var(--text-muted); padding:10px;">+ ${data.players.list.length - 10} more</div>`;
                    }
                } else {
                    playersListGrid.innerHTML = '<p class="text-muted">No players online right now.</p>';
                }

            } else {
                // Server Offline
                playerCountSpan.innerText = 'Offline';
                statusDot.style.background = '#ef4444'; // Offline Red
                statusDot.style.boxShadow = '0 0 10px #ef4444';
                playersListGrid.innerHTML = '<p class="text-muted">Server is currently offline.</p>';
            }
        })
        .catch(err => {
            console.error('Error fetching status:', err);
            playerCountSpan.innerText = 'Error';
            statusDot.style.background = '#64748b'; // Gray
            playersListGrid.innerHTML = '<p class="text-muted">Could not load player list.</p>';
        });
}

// 3. Scroll Reveal Animation Logic
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after it has revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of element is visible
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// Run functions on page load
window.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    initScrollReveal();
    
    // Optional: Update status every 60 seconds
    setInterval(updateServerStatus, 60000);
});