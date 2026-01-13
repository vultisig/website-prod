# Articles Setup

## Adding Images to Articles

### Option 1: Local Images (Recommended)

Store images in `/public/images/articles/` and reference them in the article frontmatter:

```yaml
---
title: My Article
image: "/images/articles/my-image.png"
---
```

**Steps:**
1. Add your image to `public/images/articles/`
2. Use the path `/images/articles/filename.png` in the `image:` field
3. Supported formats: PNG, JPG, SVG, WebP

**Naming convention:** Use lowercase, hyphens for spaces (e.g., `welcome-banner.png`)

### Option 2: External URLs

You can also use external image URLs:

```yaml
image: "https://example.com/image.png"
```

### Image Guidelines

- **Recommended size:** 1200x630px (social sharing optimized)
- **Max file size:** Keep under 500KB for performance
- **Format:** WebP or PNG preferred

### Frontmatter Example

```yaml
---
title: Welcome to Vultisig Articles
description: Introduction to the articles system
author: Vultisig
publishedAt: '2026-01-06T21:15:59.915Z'
image: "/images/articles/welcome-banner.png"
tags:
  - announcement
  - vultisig
featured: false
---
```

### No Image

Leave the field empty or omit it:

```yaml
image: ""
```
