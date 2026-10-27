"""Gera as fotos do site em WebP, nas larguras que cada uma ocupa na tela.

Uso (na raiz do projeto, com o Pillow instalado: pip install pillow):
    python scripts/gerar-imagens.py

Cada foto tem um arquivo mestre (o original, que não vai para a página) e
ganha versões "<nome>-<largura>.webp" ao lado dele. O index.html usa só as
versões, no srcset de cada <img>; o navegador escolhe a menor que basta
para o tamanho da foto na tela e a densidade da tela. Para trocar uma foto,
troque o mestre (mesmo nome) e rode de novo. As larguras saem das medidas
da foto na tela de 390px a 1920px (cover incluído) e vão até 3x no celular.
"""
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
QUALIDADE = 78

# mestre -> larguras das versões (nunca maiores que o próprio mestre)
FOTOS = {
    "images/banner.webp": [640, 960, 1280, 1600, 1920],
    "images/logo.webp": [128],
    "images/sobre.webp": [480, 900],
    "assets/passport-boarding-pass.webp": [480, 800, 1024],
    "assets/teatro-amazonas-atualmente-01.jpg": [480, 960],
    "assets/ponte-rio-negro-manaus-brasil.jpg": [640, 960, 1280, 1600, 1920],
    **{f"images/produto-{n}.webp": [480, 800] for n in range(2, 7)},
}


def gerar(mestre: Path, larguras: list[int]) -> None:
    with Image.open(mestre) as foto:
        modo = "RGBA" if foto.mode in ("RGBA", "LA", "P") else "RGB"
        foto = foto.convert(modo)
        for largura in larguras:
            largura = min(largura, foto.width)
            altura = round(foto.height * largura / foto.width)
            saida = mestre.with_name(f"{mestre.stem}-{largura}.webp")
            versao = foto if largura == foto.width else foto.resize((largura, altura), Image.LANCZOS)
            versao.save(saida, "WEBP", quality=QUALIDADE, method=6)
            print(f"{saida.relative_to(RAIZ)}  {largura}x{altura}  {saida.stat().st_size // 1024} KB")


if __name__ == "__main__":
    for caminho, larguras in FOTOS.items():
        gerar(RAIZ / caminho, larguras)
