/**
 * Single page application router
 */
function initializeRouter() {
    // Get the container where content will be loaded
    const contentContainer = document.getElementById('content') || document.body;
    
    // Routes configuration - map routes to element IDs
    const routes = {
        '/': 'home-section',
        '/about': 'about-section',
        '/projects': 'projects-section',
        '/contact': 'contact-section',
        // Add more routes as needed
    };
    
    // Function to navigate to a specific route
    function navigateTo(route) {
        window.history.pushState({}, '', route);
        loadContent(route);
    }
    
    // Function to load content based on current route
    function loadContent(route) {
        // Hide all sections first
        document.querySelectorAll('section[id$="-section"]').forEach(section => {
            section.style.display = 'none';
        });
        
        // Get the target section ID for the route
        const targetId = routes[route] || routes['/'];  // Default to home if route not found
        
        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        } else {
            console.error(`Section with ID '${targetId}' not found`);
        }
    }
    
    // Event listener for navigation links
    document.addEventListener('click', (e) => {
        const navLink = e.target.closest('a[data-route]');
        if (navLink) {
            e.preventDefault();
            const route = navLink.getAttribute('data-route');
            navigateTo(route);
        }
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        loadContent(window.location.pathname);
    });
    
    // Initial load based on current URL
    loadContent(window.location.pathname);
    
    // Return public methods
    return {
        navigateTo
    };
}
