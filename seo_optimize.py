import os
import re

html_files = [
    '/var/www/html/Jewellery/index.html',
    '/var/www/html/Jewellery/about.html',
    '/var/www/html/Jewellery/products.html',
    '/var/www/html/Jewellery/product.html',
    '/var/www/html/Jewellery/contact.html'
]

titles = {
    'index.html': 'Ashirwad Orna | Premium Jewelry Findings & Components',
    'about.html': 'About Us | Ashirwad Orna - Precision Jewelry Findings',
    'products.html': 'Our Products | Wholesale Jewelry Components | Ashirwad Orna',
    'product.html': 'Component Details | Ashirwad Orna',
    'contact.html': 'Partner With Us | Contact Ashirwad Orna'
}

descriptions = {
    'index.html': "India's trusted B2B partner for premium jewelry components. Supplying high-quality findings, screws, and post/nuts to wholesale jewelers and karigars pan-India.",
    'about.html': "Learn about Ashirwad Orna's legacy in manufacturing high-precision jewelry findings, screws, and components for India's finest jewelers.",
    'products.html': "Explore our wholesale collection of premium jewelry findings, perfectly engineered support posts, and precision screws for Karigars.",
    'product.html': "View detailed specifications, variants, and request bulk quotes for our premium Indian B2B jewelry components.",
    'contact.html': "Get in touch with Ashirwad Orna for wholesale jewelry finding inquiries, bulk quotes, and custom component manufacturing."
}

def inject_seo(content, filename):
    title = titles.get(os.path.basename(filename), 'Ashirwad Orna')
    desc = descriptions.get(os.path.basename(filename), '')
    slug = '' if filename.endswith('index.html') else os.path.basename(filename)
    url = f"https://ashirwadorna.com/{slug}"
    
    seo_block = f'''    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{desc}">
    <meta name="keywords" content="jewelry findings, B2B jewelry, karigars, wholesale jewelry parts, precision screws, support posts, Ashirwad Orna">
    <link rel="canonical" href="{url}">
    
    <!-- Open Graph / Meta -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{url}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc}">
    <meta property="og:image" content="https://ashirwadorna.com/images/logo.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{url}">
    <meta property="twitter:title" content="{title}">
    <meta property="twitter:description" content="{desc}">
    <meta property="twitter:image" content="https://ashirwadorna.com/images/logo.png">

    <!-- Preload / Web Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'''

    pattern = re.compile(r'<meta charset="UTF-8">.*?(?=<!-- Tailwind CSS -->)', re.DOTALL)
    
    if pattern.search(content):
        content = pattern.sub(seo_block + '\\n    ', content)
        
    return content

def optimize_images(content):
    def replacer(match):
        img_tag = match.group(0)
        # Protect against double application
        img_tag = re.sub(r'\s+loading="[^"]+"', '', img_tag)
        img_tag = re.sub(r'\s+fetchpriority="[^"]+"', '', img_tag)
        img_tag = re.sub(r'\s+decoding="[^"]+"', '', img_tag)
        
        is_header_logo = ('logo.png' in img_tag and 'opacity-90' not in img_tag)
        
        if is_header_logo:
            img_tag = img_tag.replace('<img', '<img loading="eager" fetchpriority="high" decoding="async"')
        else:
            img_tag = img_tag.replace('<img', '<img loading="lazy" decoding="async"')
            
        return img_tag

    return re.sub(r'<img\s+[^>]*>', replacer, content)

for f in html_files:
    if os.path.exists(f):
        with open(f, 'r') as file:
            content = file.read()
        
        content = inject_seo(content, f)
        content = optimize_images(content)
        
        with open(f, 'w') as file:
            file.write(content)
            
print("SEO configuration applied via python sync")
