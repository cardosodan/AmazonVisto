"""Gera a imagem do mapa do "Visite a gente" (images/mapa-centro.webp).

Uso (na raiz do projeto, com o Pillow instalado: pip install pillow):
    python scripts/gerar-mapa.py

É a fachada do mapa: o que aparece no lugar do Google Maps até a pessoa
pedir o mapa interativo (o iframe do Google só carrega nesse toque, então a
página não leva os scripts e os cookies do Google de graça). Baixa os 9
quadrados do OpenStreetMap em volta do endereço (zoom 17), junta, recorta
um quadrado com o endereço no meio e pinta em duas cores do site (a tinta
e o papel), como um mapa impresso. O pino é desenhado por cima no HTML,
no centro da imagem. Crédito: "© Colaboradores do OpenStreetMap" (ODbL),
na própria fachada e no rodapé.

Para mudar o endereço, troque LAT e LON (o ponto do pino) e rode de novo.
Com OSM_QUADROS=<pasta> usa quadrados já baixados (17-<x>-<y>.png).
"""
import io
import math
import os
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
SAIDA = RAIZ / "images/mapa-centro.webp"
LAT, LON = -3.130189, -60.02228  # Rua Costa Azevedo, 9, Centro, Manaus
ZOOM = 17
LADO = 632  # o quadrado recortado, em px
TINTA = (15, 24, 98)  # --tinta
PAPEL = (243, 244, 241)  # --papel
AGENTE = "AmazonVistoSite/1.0 (https://cardosodan.github.io/AmazonVisto/ ; mapa estatico do endereco)"


def quadro(x: int, y: int) -> Image.Image:
    pasta = os.environ.get("OSM_QUADROS")
    if pasta:
        return Image.open(Path(pasta) / f"{ZOOM}-{x}-{y}.png").convert("RGB")
    pedido = urllib.request.Request(f"https://tile.openstreetmap.org/{ZOOM}/{x}/{y}.png", headers={"User-Agent": AGENTE})
    with urllib.request.urlopen(pedido, timeout=30) as resposta:
        return Image.open(io.BytesIO(resposta.read())).convert("RGB")


def main() -> None:
    n = 2**ZOOM
    px = (LON + 180) / 360 * n
    py = (1 - math.asinh(math.tan(math.radians(LAT))) / math.pi) / 2 * n
    x0, y0 = int(px) - 1, int(py) - 1
    mosaico = Image.new("RGB", (768, 768))
    for i in range(3):
        for j in range(3):
            mosaico.paste(quadro(x0 + i, y0 + j), (i * 256, j * 256))
    cx, cy = round((px - x0) * 256), round((py - y0) * 256)
    metade = LADO // 2
    corte = mosaico.crop((cx - metade, cy - metade, cx + metade, cy + metade))
    # Duas cores: o claro do mapa vira papel e o escuro vira tinta, com mais
    # contraste para os quarteirões se separarem das ruas.
    cinza = ImageOps.grayscale(corte).point(lambda v: max(0, min(255, round((v - 120) * 255 / 135))))
    ImageOps.colorize(cinza, TINTA, PAPEL).save(SAIDA, "WEBP", quality=80, method=6)
    print(f"{SAIDA.relative_to(RAIZ)}  {LADO}x{LADO}  {SAIDA.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
