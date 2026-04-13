// /data/products.js
// Single source of truth for Ashirwad Orna B2B Jewelry Findings

const products = [
    {
        id: "sc-101",
        categoryId: "screw",
        type: "Screw (Pech)",
        name: "Classic Flat Head Pech",
        image: "./images/threaded-ear-nuts.png",
        images: ["./images/threaded-ear-nuts.png", "./images/threaded-ear-nuts2.png", "./images/threaded-ear-nuts3.png", "./images/threaded-ear-nuts4.png", "./images/threaded-ear-nuts5.png", "./images/threaded-ear-nuts6.png"],
        description: "Premium flat head screw designed specifically for seamless, high-end Indian jewelry backings. Ensures maximum security for traditional jhumkas and modern tops. Made with high-grade alloys.",
        variants: [
            { size: "1.2mm", weight: "0.45g" },
            { size: "1.5mm", weight: "0.55g" },
            { size: "2.0mm", weight: "0.75g" }
        ],
        features: [
            "Precision-cut threads for Indian standards",
            "Hypoallergenic material",
            "Flawless polished finish"
        ]
    },
    {
        id: "sc-102",
        categoryId: "screw",
        type: "Screw (Pech)",
        name: "Domed Security Pech",
        image: "./images/south-screw.png",
        images: ["./images/south-screw.png", "./images/threaded-ear-nuts7.png", "./images/threaded-ear-nuts8.png"],
        description: "Domed design offering a comfortable fit against the earlobe while providing excellent grip and security for heavy bridal earrings or intricate antique jewelry.",
        variants: [
            { size: "1.5mm", weight: "0.60g" },
            { size: "2.5mm", weight: "0.85g" }
        ],
        features: [
            "Smooth domed profile",
            "Enhanced grip for heavy weights",
            "Comfort-fit daily wear design"
        ]
    },
    {
        id: "pt-201",
        categoryId: "post",
        type: "Support Post",
        name: "Bridal Heavy Grip Post",
        image: "./images/screw-post.png",
        images: ["./images/screw-post.png"],
        description: "A large surface-area post designed to distribute the weight of heavier bridal and traditional Indian jewelry designs across the ear, preventing sagging and ensuring all-day comfort.",
        variants: [
            { size: "8mm", weight: "1.2g" },
            { size: "10mm", weight: "1.5g" }
        ],
        features: [
            "Large surface area for bridal wear",
            "Optimal weight distribution",
            "Durable attachment point for karigars"
        ]
    },
    {
        id: "pt-202",
        categoryId: "post",
        type: "Support Post",
        name: "Discreet Support Finding",
        image: "./images/push-post.png",
        images: ["./images/push-post.png", "./images/push-post2.png", "./images/push-ear-nuts.png", "./images/push-ear-nuts2.png"],
        description: "Ultra-thin, discreet support post ideal for delicate everyday pieces or lightweight contemporary sets. Provides structural integrity without compromising the aesthetic.",
        variants: [
            { size: "4mm", weight: "0.3g" },
            { size: "6mm", weight: "0.5g" }
        ],
        features: [
            "Ultra-thin profile",
            "Invisible support design",
            "High tensile strength alloy"
        ]
    }
];

// Exporting or making available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
