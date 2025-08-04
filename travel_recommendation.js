// Detect current page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('about.html')) return 'about';
    if (path.includes('contact.html')) return 'contact';
    if (path.includes('recommendations.html')) return 'recommendations';
    return 'home';
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'about':
            initializeAboutPage();
            break;
        case 'contact':
            initializeContactPage();
            break;
        case 'recommendations':
            initializeRecommendationsPage();
            break;
    }
});

function initializeHomePage() {
    console.log('Home page initialized');
    initializeSearchFunctionality();
}

function initializeAboutPage() {
    console.log('About page initialized');
}

function initializeContactPage() {
    console.log('Contact page initialized');
}

function initializeSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const clearBtn = document.querySelector('.clear-btn');
    const searchError = document.querySelector('.search-error');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // Show recommendations section on same page
                showRecommendations(query);
            } else {
                showSearchError();
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showRecommendations(query);
                } else {
                    showSearchError();
                }
            }
        });
        
        // Hide error when user types
        searchInput.addEventListener('input', function() {
            if (searchError) {
                searchError.style.display = 'none';
            }
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
            }
            if (searchError) {
                searchError.style.display = 'none';
            }
            hideRecommendations();
        });
    }
}

function showSearchError() {
    const searchError = document.querySelector('.search-error');
    if (searchError) {
        searchError.style.display = 'block';
        setTimeout(() => {
            searchError.style.display = 'none';
        }, 3000);
    }
}

function showRecommendations(query) {
    const recommendationsSection = document.querySelector('.recommendations-section');
    if (recommendationsSection) {
        recommendationsSection.style.display = 'block';
        // Scroll to recommendations
        recommendationsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Initialize recommendations functionality
        initializeRecommendationsPage();
        
        // Display recommendations based on query
        displayRecommendations(query);
    }
}

function hideRecommendations() {
    const recommendationsSection = document.querySelector('.recommendations-section');
    if (recommendationsSection) {
        recommendationsSection.style.display = 'none';
    }
}

// ===== RECOMMENDATIONS PAGE FUNCTIONALITY =====

// Global variable to store fetched travel data
let TRAVEL_DATA = null;

function initializeRecommendationsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || '';
    
    // Update search input if it exists on recommendations page
    const searchInput = document.querySelector('.search-input');
    if (searchInput && searchQuery) {
        searchInput.value = searchQuery;
    }
    
    // Show loading state
    showLoadingState();
    
    // Fetch travel data and initialize page
    fetchTravelData()
        .then(() => {
            // Initialize filtering functionality
            initializeRecommendationFilters();
            
            // Display recommendations based on search query
            displayRecommendations(searchQuery);
            
            // Initialize search functionality on recommendations page
            initializeRecommendationSearch();
        })
        .catch(error => {
            console.error('Error loading travel data:', error);
            showErrorState();
        });
}

async function fetchTravelData() {
    try {
        // Show loading indicator
        console.log('Loading travel data...');
        
        const response = await fetch('travel_recommendation_api.json'); // Adjust path as needed
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        TRAVEL_DATA = await response.json();
        console.log('Travel data loaded successfully:', TRAVEL_DATA);
        
        return TRAVEL_DATA;
    } catch (error) {
        console.error('Failed to fetch travel data:', error);
        
        // Fallback to sample data if JSON file is not available
        console.log('Using fallback sample data...');
        TRAVEL_DATA = getSampleData();
        
        return TRAVEL_DATA;
    }
}

function getSampleData() {
    // Fallback sample data in case the JSON file is not available
    return {
        "countries": [
          {
            "id": 1,
            "name": "Australia",
            "cities": [
              {
                "name": "Sydney, Australia",
                "imageUrl": "enter_your_image_for_sydney.jpg",
                "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
              },
              {
                "name": "Melbourne, Australia",
                "imageUrl": "enter_your_image_for_melbourne.jpg",
                "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
              }
            ]
          },
          {
            "id": 2,
            "name": "Japan",
            "cities": [
              {
                "name": "Tokyo, Japan",
                "imageUrl": "enter_your_image_for_tokyo.jpg",
                "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
              },
              {
                "name": "Kyoto, Japan",
                "imageUrl": "enter_your_image_for_kyoto.jpg",
                "description": "Known for its historic temples, gardens, and traditional tea houses."
              }
            ]
          },
          {
            "id": 3,
            "name": "Brazil",
            "cities": [
              {
                "name": "Rio de Janeiro, Brazil",
                "imageUrl": "enter_your_image_for_rio.jpg",
                "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
              },
              {
                "name": "São Paulo, Brazil",
                "imageUrl": "enter_your_image_for_sao-paulo.jpg",
                "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
              }
            ]
          }
        ],
        "temples": [
          {
            "id": 1,
            "name": "Angkor Wat, Cambodia",
            "imageUrl": "enter_your_image_for_angkor-wat.jpg",
            "description": "A UNESCO World Heritage site and the largest religious monument in the world."
          },
          {
            "id": 2,
            "name": "Taj Mahal, India",
            "imageUrl": "enter_your_image_for_taj-mahal.jpg",
            "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
          }
        ],
        "beaches": [
          {
            "id": 1,
            "name": "Bora Bora, French Polynesia",
            "imageUrl": "enter_your_image_for_bora-bora.jpg",
            "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
          },
          {
            "id": 2,
            "name": "Copacabana Beach, Brazil",
            "imageUrl": "enter_your_image_for_copacabana.jpg",
            "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
          }
        ]
    };
}

function initializeRecommendationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn, .category-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const category = this.dataset.category || this.dataset.filter || 'all';
            
            // Filter and display recommendations
            filterRecommendations(category);
        });
    });
}

function initializeRecommendationSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const clearBtn = document.querySelector('.clear-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            displayRecommendations(query);
            
            // Update URL without page reload
            const newUrl = query ? 
                `${window.location.pathname}?q=${encodeURIComponent(query)}` : 
                window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                displayRecommendations(query);
                
                // Update URL without page reload
                const newUrl = query ? 
                    `${window.location.pathname}?q=${encodeURIComponent(query)}` : 
                    window.location.pathname;
                window.history.replaceState({}, '', newUrl);
            }
        });
    }
    
    // Clear button functionality specific to recommendations page
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            clearSearch();
        });
    }
}

function displayRecommendations(searchQuery = '') {
    const container = document.querySelector('.recommendations-container, .results-container, .destinations-grid');
    
    if (!container) {
        console.warn('Recommendations container not found');
        return;
    }
    
    // Check if data is loaded
    if (!TRAVEL_DATA) {
        showLoadingState();
        return;
    }
    
    // Get filtered recommendations based on search query
    const recommendations = getFilteredRecommendations(searchQuery);
    
    // Update results count
    updateResultsCount(recommendations.length, searchQuery);
    
    // Clear existing content
    container.innerHTML = '';
    
    if (recommendations.length === 0) {
        showNoResults(container, searchQuery);
        return;
    }
    
    // Display recommendations
    recommendations.forEach((item, index) => {
        const card = createRecommendationCard(item, index);
        container.appendChild(card);
    });
    
    // Animate cards appearance
    animateRecommendationCards();
}

function getFilteredRecommendations(searchQuery = '') {
    // Check if data is loaded
    if (!TRAVEL_DATA) {
        console.warn('Travel data not loaded yet');
        return [];
    }
    
    let allRecommendations = [];
    
    // Flatten all cities from countries
    TRAVEL_DATA.countries.forEach(country => {
        country.cities.forEach(city => {
            allRecommendations.push({
                ...city,
                type: 'city',
                country: country.name
            });
        });
    });
    
    // Add temples
    TRAVEL_DATA.temples.forEach(temple => {
        allRecommendations.push({
            ...temple,
            type: 'temple'
        });
    });
    
    // Add beaches
    TRAVEL_DATA.beaches.forEach(beach => {
        allRecommendations.push({
            ...beach,
            type: 'beach'
        });
    });
    
    // Filter based on search query
    if (!searchQuery) {
        return allRecommendations;
    }
    
    const query = searchQuery.toLowerCase();
    return allRecommendations.filter(item => {
        return item.name.toLowerCase().includes(query) ||
               item.description.toLowerCase().includes(query) ||
               item.type.toLowerCase().includes(query) ||
               (item.country && item.country.toLowerCase().includes(query));
    });
}

function filterRecommendations(category) {
    const container = document.querySelector('.recommendations-container, .results-container, .destinations-grid');
    
    if (!container) return;
    
    // Check if data is loaded
    if (!TRAVEL_DATA) {
        showLoadingState();
        return;
    }
    
    let filteredData = [];
    
    switch(category.toLowerCase()) {
        case 'all':
            filteredData = getFilteredRecommendations();
            break;
        case 'cities':
        case 'city':
            TRAVEL_DATA.countries.forEach(country => {
                country.cities.forEach(city => {
                    filteredData.push({
                        ...city,
                        type: 'city',
                        country: country.name
                    });
                });
            });
            break;
        case 'temples':
        case 'temple':
            filteredData = TRAVEL_DATA.temples.map(temple => ({
                ...temple,
                type: 'temple'
            }));
            break;
        case 'beaches':
        case 'beach':
            filteredData = TRAVEL_DATA.beaches.map(beach => ({
                ...beach,
                type: 'beach'
            }));
            break;
        default:
            filteredData = getFilteredRecommendations();
    }
    
    // Update results count
    updateResultsCount(filteredData.length, category);
    
    // Clear and display filtered results
    container.innerHTML = '';
    
    if (filteredData.length === 0) {
        showNoResults(container, category);
        return;
    }
    
    filteredData.forEach((item, index) => {
        const card = createRecommendationCard(item, index);
        container.appendChild(card);
    });
    
    // Animate cards
    animateRecommendationCards();
}

function createRecommendationCard(item, index) {
    const card = document.createElement('div');
    card.className = 'recommendation-card destination-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Use placeholder image if imageUrl contains "enter_your_image"
    const imageUrl = item.imageUrl.includes('enter_your_image') ? 
        `https://via.placeholder.com/400x250/4CAF50/white?text=${encodeURIComponent(item.name)}` : 
        item.imageUrl;
    
    card.innerHTML = `
        <div class="card-image">
            <img src="${imageUrl}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x250/4CAF50/white?text=${encodeURIComponent(item.name)}'">
            <div class="card-overlay">
                <span class="card-type">${item.type}</span>
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${item.name}</h3>
            <p class="card-description">${item.description}</p>
            <div class="card-actions">
                <button class="visit-btn" onclick="handleVisitClick('${item.name}', '${item.type}')">
                    Visit
                </button>
                <button class="learn-more-btn" onclick="showDestinationDetails('${item.name}', '${item.type}')">
                    Learn More
                </button>
            </div>
        </div>
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    return card;
}

function updateResultsCount(count, searchTerm) {
    const countElement = document.querySelector('.results-count, .search-results-count');
    
    if (countElement) {
        let message = `Found ${count} result${count !== 1 ? 's' : ''}`;
        if (searchTerm) {
            message += ` for "${searchTerm}"`;
        }
        countElement.textContent = message;
    }
}

function showNoResults(container, searchTerm) {
    container.innerHTML = `
        <div class="no-results">
            <div class="no-results-icon">🔍</div>
            <h3>No results found</h3>
            <p>We couldn't find any destinations matching "${searchTerm}".</p>
            <p>Try searching for cities, beaches, temples, or countries.</p>
            <button class="clear-search-btn" onclick="clearSearch()">Clear Search</button>
        </div>
    `;
}

function clearSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Clear URL parameter
    window.history.replaceState({}, '', window.location.pathname);
    
    // Show all recommendations
    displayRecommendations();
    
    // Reset filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn, .category-filter');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Activate "All" filter if it exists
    const allFilter = document.querySelector('[data-category="all"], [data-filter="all"]');
    if (allFilter) {
        allFilter.classList.add('active');
    }
}

function animateRecommendationCards() {
    const cards = document.querySelectorAll('.recommendation-card, .destination-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function handleVisitClick(destinationName, type) {
    console.log(`Visiting ${destinationName} (${type})`);
    
    // Add click animation
    const clickedButton = event.target;
    clickedButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedButton.style.transform = '';
    }, 150);
    
    // Show visit modal or redirect to booking
    showVisitModal(destinationName, type);
}

function showVisitModal(destinationName, type) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #333;">Plan Your Visit</h3>
        <p style="margin-bottom: 1.5rem; color: #666;">Ready to explore <strong>${destinationName}</strong>?</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button onclick="this.closest('[style*=position]').remove()" style="
                background: #f5f5f5;
                color: #333;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            ">Maybe Later</button>
            <button onclick="bookDestination('${destinationName}'); this.closest('[style*=position]').remove()" style="
                background: #00695C;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            ">Book Now</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showDestinationDetails(destinationName, type) {
    console.log(`Showing details for ${destinationName} (${type})`);
    
    // Find the destination data
    const destination = findDestinationByName(destinationName);
    
    if (!destination) {
        console.error('Destination not found:', destinationName);
        return;
    }
    
    // Create details modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        overflow-y: auto;
    `;
    
    const imageUrl = destination.imageUrl.includes('enter_your_image') ? 
        `https://via.placeholder.com/400x250/4CAF50/white?text=${encodeURIComponent(destination.name)}` : 
        destination.imageUrl;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 10px;
        max-width: 600px;
        margin: 20px;
        overflow: hidden;
    `;
    
    modalContent.innerHTML = `
        <div style="position: relative;">
            <img src="${imageUrl}" alt="${destination.name}" 
                 style="width: 100%; height: 200px; object-fit: cover;"
                 onerror="this.src='https://via.placeholder.com/600x200/4CAF50/white?text=${encodeURIComponent(destination.name)}'">
            <button onclick="this.closest('[style*=position]').remove()" 
                    style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); 
                           color: white; border: none; border-radius: 50%; width: 30px; height: 30px; 
                           cursor: pointer;">×</button>
        </div>
        <div style="padding: 2rem;">
            <h2 style="margin-bottom: 0.5rem; color: #333;">${destination.name}</h2>
            <span style="background: #00695C; color: white; padding: 4px 8px; border-radius: 4px; 
                         font-size: 0.8rem; text-transform: uppercase;">${type}</span>
            <p style="margin: 1.5rem 0; color: #666; line-height: 1.6;">${destination.description}</p>
            
            <div style="border-top: 1px solid #eee; padding-top: 1.5rem; display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="this.closest('[style*=position]').remove()" style="
                    background: #f5f5f5;
                    color: #333;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                ">Close</button>
                <button onclick="bookDestination('${destination.name}'); this.closest('[style*=position]').remove()" style="
                    background: #00695C;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                ">Book This Destination</button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function findDestinationByName(name) {
    // Check if data is loaded
    if (!TRAVEL_DATA) {
        console.warn('Travel data not loaded yet');
        return null;
    }
    
    // Search in cities
    for (const country of TRAVEL_DATA.countries) {
        const city = country.cities.find(city => city.name === name);
        if (city) {
            return { ...city, type: 'city', country: country.name };
        }
    }
    
    // Search in temples
    const temple = TRAVEL_DATA.temples.find(temple => temple.name === name);
    if (temple) {
        return { ...temple, type: 'temple' };
    }
    
    // Search in beaches
    const beach = TRAVEL_DATA.beaches.find(beach => beach.name === name);
    if (beach) {
        return { ...beach, type: 'beach' };
    }
    
    return null;
}

function bookDestination(destinationName) {
    console.log(`Booking ${destinationName}...`);
    
    // Here you would typically redirect to a booking page or open a booking form
    // For now, we'll show a simple confirmation
    alert(`Thank you for your interest in ${destinationName}! Our booking system will be available soon.`);
}

// ===== LOADING AND ERROR STATE FUNCTIONS =====

function showLoadingState() {
    const container = document.querySelector('.recommendations-container, .results-container, .destinations-grid');
    
    if (!container) return;
    
    container.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <h3>Loading destinations...</h3>
            <p>Please wait while we fetch the latest travel recommendations.</p>
        </div>
    `;
    
    // Add some basic styling for the loading state
    const style = document.createElement('style');
    style.textContent = `
        .loading-state {
            text-align: center;
            padding: 3rem;
            color: #666;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #00695C;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .error-state {
            text-align: center;
            padding: 3rem;
            color: #666;
        }
        
        .error-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .retry-btn {
            background: #00695C;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
        }
        
        .retry-btn:hover {
            background: #004D40;
        }
    `;
    
    // Only add the style if it doesn't exist
    if (!document.querySelector('#loading-styles')) {
        style.id = 'loading-styles';
        document.head.appendChild(style);
    }
}

function showErrorState() {
    const container = document.querySelector('.recommendations-container, .results-container, .destinations-grid');
    
    if (!container) return;
    
    container.innerHTML = `
        <div class="error-state">
            <div class="error-icon">⚠️</div>
            <h3>Unable to load destinations</h3>
            <p>We're having trouble loading the travel data. Please check your connection and try again.</p>
            <button class="retry-btn" onclick="retryLoadingData()">Try Again</button>
        </div>
    `;
}

function retryLoadingData() {
    // Show loading state again
    showLoadingState();
    
    // Retry fetching data
    fetchTravelData()
        .then(() => {
            // Get current search query if any
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('q') || '';
            
            // Display recommendations
            displayRecommendations(searchQuery);
        })
        .catch(error => {
            console.error('Retry failed:', error);
            showErrorState();
        });
};