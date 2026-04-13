// /assets/js/products.js
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Check URL parameters for an initial filter
    const urlParams = new URLSearchParams(window.location.search);
    let currentFilter = urlParams.get('filter') || 'all';

    function renderProducts(filter) {
        if (!productGrid) return;

        productGrid.innerHTML = '';
        // 'products' is available globally from /data/products.js
        const filtered = filter === 'all' ? products : products.filter(p => p.categoryId === filter);

        if (filtered.length === 0) {
            productGrid.innerHTML = '<p class="col-span-full text-center text-slate-500 py-12 font-light">No components found in this category.</p>';
            return;
        }

        filtered.forEach(product => {
            const card = document.createElement('a');
            card.href = `product.html?id=${product.id}`;
            card.className = 'group flex flex-col bg-white rounded shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-md transition-smooth overflow-hidden hover:-translate-y-1';

            // Image logic: prioritize images array, fallback to image string, then use icon
            const icon = product.categoryId === 'screw' ? 'ph-nut' : 'ph-shield-check';

            let visualHTML = `<i class="ph ${icon} text-7xl text-slate-300 group-hover:scale-110 group-hover:text-brand-accent/30 transition-smooth duration-700"></i>`;
            const primaryImage = (product.images && product.images.length > 0) ? product.images[0] : product.image;

            if (primaryImage) {
                visualHTML = `<img src="${primaryImage}" alt="${product.name}" loading="lazy" decoding="async" class="w-full h-full object-cover transition-smooth duration-700 group-hover:scale-110" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><i class="ph ${icon} text-7xl text-slate-300 group-hover:scale-110 group-hover:text-brand-accent/30 transition-smooth duration-700" style="display: none;"></i>`;
            }

            card.innerHTML = `
                <div class="relative overflow-hidden bg-slate-50 aspect-[4/3] flex items-center justify-center border-b border-slate-100">
                    ${visualHTML}
                    <div class="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-smooth"></div>
                    <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 md:px-4 py-1 flex items-center justify-center text-xs font-medium uppercase tracking-wider rounded text-brand-dark shadow-sm border border-slate-100">
                        ${product.type}
                    </div>
                </div>
                <div class="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="text-xl font-medium text-brand-dark mb-3">${product.name}</h3>
                        <p class="text-slate-500 font-light text-sm line-clamp-2 leading-relaxed mb-4">${product.description}</p>
                    </div>
                    <div class="mt-2 flex items-center justify-between text-sm border-t border-slate-50 pt-4">
                        <span class="text-slate-400 font-light">${product.variants.length} Variants Available</span>
                        <span class="text-brand-accent font-medium group-hover:text-brand-accentLight transition-smooth flex items-center gap-1">
                            Details <i class="ph ph-arrow-right -rotate-45 group-hover:rotate-0 transition-smooth"></i>
                        </span>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    const mobileFilter = document.getElementById('mobile-filter');

    // Initialize UI
    function updateActiveFilter(filter) {
        if (mobileFilter) mobileFilter.value = filter;

        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('bg-brand-dark', 'text-white', 'border-brand-dark');
                btn.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-50', 'border-slate-200');
            } else {
                btn.classList.remove('bg-brand-dark', 'text-white', 'border-brand-dark');
                btn.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-50', 'border-slate-200');
            }
        });
    }

    // Set initial state
    if (typeof products !== 'undefined') {
        updateActiveFilter(currentFilter);
        renderProducts(currentFilter);
    }

    // Add listeners
    if (mobileFilter) {
        mobileFilter.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            // Update URL without reloading
            const newUrl = currentFilter === 'all'
                ? window.location.pathname
                : `${window.location.pathname}?filter=${currentFilter}`;
            window.history.pushState({}, '', newUrl);

            updateActiveFilter(currentFilter);
            renderProducts(currentFilter);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            // Update URL without reloading
            const newUrl = currentFilter === 'all'
                ? window.location.pathname
                : `${window.location.pathname}?filter=${currentFilter}`;
            window.history.pushState({}, '', newUrl);

            updateActiveFilter(currentFilter);
            renderProducts(currentFilter);
        });
    });
});
