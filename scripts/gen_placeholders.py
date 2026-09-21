#!/usr/bin/env python3
"""
Genera imágenes placeholder (SVG) para KROWN.
Uso: python3 gen_placeholders.py
Estas imágenes son SOLO temporales -> reemplázalas por fotos/video reales
manteniendo el mismo nombre de archivo (o actualiza el src en el HTML).
"""
import os

BASE = os.path.join(os.path.dirname(__file__), "..", "assets")

PURPLE = "#6929B2"
BG = "#141317"
BG2 = "#1c1a20"
LINE = "#2c2932"
TEXT = "#8f8a99"

def svg_placeholder(label, sub, w=1200, h=800):
    cx, cy = w / 2, h / 2
    grid_lines = []
    step = 40
    x = 0
    while x <= w:
        grid_lines.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}" stroke="{LINE}" stroke-width="1" opacity="0.35"/>')
        x += step
    y = 0
    while y <= h:
        grid_lines.append(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}" stroke="{LINE}" stroke-width="1" opacity="0.35"/>')
        y += step
    bracket = 28
    m = 24
    corners = f'''
    <path d="M{m} {m+bracket} V{m} H{m+bracket}" stroke="{PURPLE}" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M{w-m-bracket} {m} H{w-m} V{m+bracket}" stroke="{PURPLE}" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M{m} {h-m-bracket} V{h-m} H{m+bracket}" stroke="{PURPLE}" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M{w-m-bracket} {h-m} H{w-m} V{h-m-bracket}" stroke="{PURPLE}" stroke-width="2" fill="none" opacity="0.8"/>
    '''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <defs>
    <radialGradient id="g" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="{BG2}"/>
      <stop offset="100%" stop-color="{BG}"/>
    </radialGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#g)"/>
  <g>{''.join(grid_lines)}</g>
  <circle cx="{cx}" cy="{cy}" r="3" fill="{PURPLE}"/>
  <text x="{cx}" y="{cy - 14}" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#e8e6ec" letter-spacing="1">{label}</text>
  <text x="{cx}" y="{cy + 20}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="{TEXT}" letter-spacing="0.5">{sub}</text>
  {corners}
</svg>'''

def write(path, label, sub, w=1200, h=800):
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(svg_placeholder(label, sub, w, h))
    print("OK", path)

# Hero poster (fallback si el navegador no puede reproducir el video)
write("video/hero-poster.svg", "VIDEO EN LOOP", "Reemplaza hero-poster.jpg y hero-loop.mp4/webm", 1600, 900)

# Equipos
write("img/equipos/krown-vanguard.svg", "KROWN VANGUARD", "Foto real del equipo disponible", 1000, 750)
write("img/equipos/proyecto-i7-6700.svg", "PROYECTO ENTREGADO", "i7-6700 / GTX 1060 6GB", 1000, 750)
write("img/equipos/arma-el-tuyo.svg", "ARMA EL TUYO", "Cotización personalizada", 1000, 750)

# Trabajos destacados - before/after (home)
for n, titulo in [("001", "Mantenimiento N2"), ("002", "Armado a Medida"), ("003", "Personalizacion Estetica")]:
    write(f"img/trabajos/proyecto-{n}-antes.svg", f"ANTES — PROYECTO {n}", titulo, 1000, 750)
    write(f"img/trabajos/proyecto-{n}-despues.svg", f"DESPUES — PROYECTO {n}", titulo, 1000, 750)

# Portafolio (trabajos.html) - casos adicionales
for n, titulo in [("004", "Mantenimiento N1"), ("005", "Diagnostico y Reparacion"), ("006", "Armado a Medida")]:
    write(f"img/trabajos/proyecto-{n}-antes.svg", f"ANTES — PROYECTO {n}", titulo, 1000, 750)
    write(f"img/trabajos/proyecto-{n}-despues.svg", f"DESPUES — PROYECTO {n}", titulo, 1000, 750)

# Testing / proceso
write("img/misc/testing-bench.svg", "BANCO DE PRUEBAS", "Captura real de HWiNFO / OCCT", 1200, 800)

# Quienes somos
write("img/misc/taller.svg", "TALLER KROWN", "Foto del espacio de trabajo", 1200, 900)

# Favicon simple (cuadrado con acento morado) como placeholder
write("img/misc/social-share.svg", "KROWN", "Imagen para compartir en redes (1200x630)", 1200, 630)

print("\nListo. Todas las imágenes son placeholders SVG — reemplázalas por fotos/video reales.")
