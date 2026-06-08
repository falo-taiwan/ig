#!/usr/bin/env python3
import os
import sys
from PIL import Image

# Source image path
SOURCE_IMG = "/Users/force/.gemini/antigravity/brain/ab18171c-0758-4762-9305-c337dc582ac9/falo_ig_icon_1780928444476.png"
OUTPUT_DIR = "/Users/force/Google_Antigravity/test-case/ig-video-enhancer-extension/icons"

SIZES = [16, 48, 128]

def resize():
    if not os.path.exists(SOURCE_IMG):
        print(f"Error: Source image not found at {SOURCE_IMG}")
        sys.exit(1)
        
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    try:
        with Image.open(SOURCE_IMG) as img:
            for size in SIZES:
                out_path = os.path.join(OUTPUT_DIR, f"icon{size}.png")
                # Use Lanczos resampling for premium downscaling quality
                resized = img.resize((size, size), Image.Resampling.LANCZOS)
                resized.save(out_path, "PNG")
                print(f"Generated: {out_path} ({size}x{size})")
        print("Icons generated successfully!")
    except Exception as e:
        print(f"Error generating icons: {e}")
        sys.exit(1)

if __name__ == "__main__":
    resize()
