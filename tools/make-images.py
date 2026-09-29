"""Generate responsive WebP versions of every JPG in assets/img.

Usage (from the repo root):
    python -m pip install Pillow
    python tools/make-images.py

For each assets/img/<name>.jpg it writes <name>-<width>.webp for the widths
below (never upscaling), and rebuilds og-image.jpg from hero.jpg.
The original .jpg stays as the fallback for very old browsers.
"""
from pathlib import Path

from PIL import Image

IMG = Path(__file__).resolve().parent.parent / "assets" / "img"
WIDTHS = {"hero": (800, 1600)}  # everything else uses DEFAULT_WIDTHS
DEFAULT_WIDTHS = (600, 1000)
QUALITY = 78


def make_webp(src: Path) -> None:
    im = Image.open(src).convert("RGB")
    for w in WIDTHS.get(src.stem, DEFAULT_WIDTHS):
        w = min(w, im.width)
        out = src.with_name(f"{src.stem}-{w}.webp")
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
        print(f"{out.name:22s} {w}x{h}  {out.stat().st_size // 1024} KB")


def make_og(hero: Path) -> None:
    # 1200x630 social preview, cropped around the bowl in the hero photo
    im = Image.open(hero).convert("RGB")
    crop_h = round(im.width * 630 / 1200)
    top = max(0, min(im.height - crop_h, round(im.height * 0.55) - crop_h // 2))
    og = im.crop((0, top, im.width, top + crop_h)).resize((1200, 630), Image.LANCZOS)
    og.save(IMG / "og-image.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    print(f"og-image.jpg           1200x630  {(IMG / 'og-image.jpg').stat().st_size // 1024} KB")


if __name__ == "__main__":
    for jpg in sorted(IMG.glob("*.jpg")):
        if jpg.stem != "og-image":
            make_webp(jpg)
    make_og(IMG / "hero.jpg")
