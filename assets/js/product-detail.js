// /assets/js/product-detail.js
document.addEventListener('DOMContentLoaded', () => {
    const errorContainer = document.getElementById('error-container');
    const productContainer = document.getElementById('product-container');

    // Parse URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId || typeof products === 'undefined') {
        showError();
        return;
    }

    // Find Product
    const product = products.find(p => p.id === productId);

    if (!product) {
        showError();
        return;
    }

    renderProduct(product);

    function showError() {
        if (errorContainer) errorContainer.classList.remove('hidden');
        if (productContainer) productContainer.classList.add('hidden');
    }

    function renderProduct(p) {
        if (errorContainer) errorContainer.classList.add('hidden');
        if (productContainer) productContainer.classList.remove('hidden');

        // Update basic DOM elements
        document.title = `${p.name} | Ashirwad Orna`;
        const breadcrumbEl = document.getElementById('breadcrumb-brand');
        if (breadcrumbEl) breadcrumbEl.textContent = p.name;

        const typeEl = document.getElementById('product-type');
        if (typeEl) typeEl.textContent = p.type;

        const nameEl = document.getElementById('product-name');
        if (nameEl) nameEl.textContent = p.name;

        const descEl = document.getElementById('product-desc');
        if (descEl) descEl.textContent = p.description;

        // Setup Images & Gallery
        const iconClasses = p.categoryId === 'screw' ? 'ph-nut' : 'ph-shield-check';
        const mainImageContainer = document.getElementById('main-image-container');
        const thumbnailsContainer = document.getElementById('thumbnails-container');

        let productImages = [];
        if (p.images && p.images.length > 0) {
            productImages = p.images;
        } else if (p.image) {
            productImages = [p.image];
        }

        let currentlySelectedImageIndex = 0;

        if (mainImageContainer) {
            mainImageContainer.classList.add('cursor-pointer');
            mainImageContainer.innerHTML = '';
            if (productImages.length > 0) {
                mainImageContainer.innerHTML = `
                    <img id="main-photo" src="${productImages[0]}" alt="${p.name}" loading="lazy" decoding="async" class="w-full h-full object-cover transition-smooth duration-700 group-hover:scale-110" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <i class="ph ${iconClasses} text-9xl text-slate-300 transition-smooth duration-700 group-hover:scale-110 group-hover:text-brand-accent/40" style="display: none;"></i>
                    <div class="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-smooth pointer-events-none"></div>
                `;
            } else {
                mainImageContainer.innerHTML = `
                    <i class="ph ${iconClasses} text-9xl text-slate-300 transition-smooth duration-700 group-hover:scale-110 group-hover:text-brand-accent/40"></i>
                    <div class="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-smooth pointer-events-none"></div>
                `;
            }

            mainImageContainer.addEventListener('click', () => {
                if (typeof openSlider === 'function') openSlider(currentlySelectedImageIndex);
            });
        }

        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = '';
            if (productImages.length > 0) {
                const maxThumbs = 4;
                const displayCount = Math.min(productImages.length, maxThumbs);
                const extraCount = productImages.length - maxThumbs;

                for (let i = 0; i < displayCount; i++) {
                    const isLastThumbAndHasExtra = (i === maxThumbs - 1) && extraCount > 0;

                    const thumbDiv = document.createElement('div');
                    thumbDiv.className = `relative bg-white rounded aspect-square flex items-center justify-center cursor-pointer shadow-sm overflow-hidden ${i === 0 ? 'border-2 border-brand-accent' : 'border border-slate-200 hover:border-slate-300 transition-smooth'}`;

                    thumbDiv.innerHTML = `
                        <img src="${productImages[i]}" alt="Thumbnail ${i + 1}" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <i class="ph ${iconClasses} text-3xl text-slate-400" style="display: none;"></i>
                    `;

                    if (isLastThumbAndHasExtra) {
                        const overlay = document.createElement('div');
                        overlay.className = 'absolute inset-0 bg-brand-dark/70 flex items-center justify-center backdrop-blur-[2px] transition-smooth hover:bg-brand-dark/80';
                        overlay.innerHTML = `<span class="text-white font-medium text-xl">+${extraCount + 1}</span>`;
                        thumbDiv.appendChild(overlay);

                        // Clicking +X overlay directly opens slider
                        overlay.addEventListener('click', (e) => {
                            e.stopPropagation();
                            if (typeof openSlider === 'function') openSlider(i);
                        });
                    }

                    // Click interaction to change main photo
                    thumbDiv.addEventListener('click', () => {
                        Array.from(thumbnailsContainer.children).forEach(child => {
                            child.classList.remove('border-2', 'border-brand-accent');
                            child.classList.add('border', 'border-slate-200');
                        });
                        thumbDiv.classList.remove('border', 'border-slate-200');
                        thumbDiv.classList.add('border-2', 'border-brand-accent');


                        const mainPhoto = document.getElementById('main-photo');
                        if (mainPhoto) {
                            currentlySelectedImageIndex = i;
                            mainPhoto.src = productImages[i];
                            mainPhoto.style.display = 'block';
                            if (mainPhoto.nextElementSibling) {
                                mainPhoto.nextElementSibling.style.display = 'none';
                            }
                        }
                    });

                    thumbnailsContainer.appendChild(thumbDiv);
                }
            } else {
                thumbnailsContainer.innerHTML = `
                    <div class="bg-white rounded aspect-square border-2 border-brand-accent flex items-center justify-center cursor-pointer shadow-sm overflow-hidden">
                        <i class="ph ${iconClasses} text-3xl text-slate-400"></i>
                    </div>
                `;
            }
        }

        // Initialize Slider Modal
        let currentSliderIndex = 0;
        const sliderModal = document.getElementById('image-slider-modal');
        const sliderImage = document.getElementById('slider-image');
        const sliderClose = document.getElementById('slider-close');
        const sliderPrev = document.getElementById('slider-prev');
        const sliderNext = document.getElementById('slider-next');
        const sliderCurrentIndexEl = document.getElementById('slider-current-index');
        const sliderTotalCountEl = document.getElementById('slider-total-count');

        window.openSlider = function (startIndex) {
            if (!sliderModal || productImages.length === 0) return;
            currentSliderIndex = startIndex;
            updateSliderImage();
            sliderModal.classList.remove('hidden');
            sliderModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            if (sliderTotalCountEl) sliderTotalCountEl.textContent = productImages.length;
        };

        function closeSlider() {
            if (!sliderModal) return;
            sliderModal.classList.add('hidden');
            sliderModal.classList.remove('flex');
            document.body.style.overflow = '';
        }

        function updateSliderImage() {
            if (!sliderImage || productImages.length === 0) return;
            sliderImage.style.opacity = '0.5';
            setTimeout(() => {
                sliderImage.src = productImages[currentSliderIndex];
                sliderImage.style.opacity = '1';
            }, 100);
            if (sliderCurrentIndexEl) sliderCurrentIndexEl.textContent = currentSliderIndex + 1;
        }

        if (sliderNext) {
            sliderNext.addEventListener('click', (e) => {
                e.stopPropagation();
                currentSliderIndex = (currentSliderIndex + 1) % productImages.length;
                updateSliderImage();
            });
        }

        if (sliderPrev) {
            sliderPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                currentSliderIndex = (currentSliderIndex - 1 + productImages.length) % productImages.length;
                updateSliderImage();
            });
        }

        if (sliderClose) {
            sliderClose.addEventListener('click', closeSlider);
        }

        if (sliderModal) {
            sliderModal.addEventListener('click', (e) => {
                if (e.target === sliderModal) closeSlider();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (!sliderModal || sliderModal.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeSlider();
            if (e.key === 'ArrowRight' && sliderNext) sliderNext.click();
            if (e.key === 'ArrowLeft' && sliderPrev) sliderPrev.click();
        });

        // Render Features
        const featuresEl = document.getElementById('product-features');
        if (featuresEl && p.features) {
            featuresEl.innerHTML = '';
            p.features.forEach(feature => {
                const li = document.createElement('li');
                li.className = 'flex items-start gap-2';
                li.innerHTML = `<i class="ph-fill ph-check-circle text-brand-accent mt-1"></i> <span>${feature}</span>`;
                featuresEl.appendChild(li);
            });
        }

        // Render Variants
        const variantsEl = document.getElementById('variants-container');
        if (variantsEl && p.variants) {
            variantsEl.innerHTML = '';
            p.variants.forEach((variant, index) => {
                const isSelected = index === 0; // Default first to selected

                const btn = document.createElement('button');
                btn.className = `variant-btn flex flex-col text-left p-3 rounded border transition-smooth w-full focus:outline-none shadow-sm ${isSelected ? 'border-brand-accent bg-brand-light' : 'border-slate-200 bg-white hover:border-slate-300'}`;

                btn.innerHTML = `
                    <span class="text-sm font-medium ${isSelected ? 'text-brand-dark' : 'text-slate-700'}">Size: ${variant.size}</span>
                    <span class="text-xs font-light ${isSelected ? 'text-slate-600' : 'text-slate-500'} mt-1">Weight: ${variant.weight}</span>
                `;

                // Click interaction
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.variant-btn').forEach(b => {
                        b.classList.remove('border-brand-accent', 'bg-brand-light');
                        b.classList.add('border-slate-200', 'bg-white');
                        const firstSpan = b.querySelector('span:first-child');
                        if (firstSpan) {
                            firstSpan.classList.remove('text-brand-dark');
                            firstSpan.classList.add('text-slate-700');
                        }
                        const lastSpan = b.querySelector('span:last-child');
                        if (lastSpan) {
                            lastSpan.classList.remove('text-slate-600');
                            lastSpan.classList.add('text-slate-500');
                        }
                    });

                    btn.classList.add('border-brand-accent', 'bg-brand-light');
                    btn.classList.remove('border-slate-200', 'bg-white');
                    const firstSpan = btn.querySelector('span:first-child');
                    if (firstSpan) {
                        firstSpan.classList.add('text-brand-dark');
                        firstSpan.classList.remove('text-slate-700');
                    }
                    const lastSpan = btn.querySelector('span:last-child');
                    if (lastSpan) {
                        lastSpan.classList.add('text-slate-600');
                        lastSpan.classList.remove('text-slate-500');
                    }
                });

                variantsEl.appendChild(btn);
            });
        }
    }
});
