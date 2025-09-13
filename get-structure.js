#!/bin/bash
echo "=== STRUCTURE JAZZ EN TECH ==="
echo "📅 $(date)"
echo ""
echo "🗂️  PAGES PRINCIPALES:"
find src/app -name "page.tsx" -type f | grep -E "(page\.tsx)$" | sort
echo ""
echo "🎨 COMPOSANTS:"
find src -name "*.tsx" -path "*/components/*" | sort
echo ""
echo "🖼️  ASSETS:"
find public -type f | head -10
echo ""
echo "📋 TOTAL PAGES:" $(find src/app -name "page.tsx" | wc -l)