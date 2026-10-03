#!/usr/bin/env python3
import sys
import subprocess
import pathlib

def convert(input_path: str):
    p = pathlib.Path(input_path)
    if not p.exists():
        print(f"File {input_path} not found", file=sys.stderr)
        sys.exit(1)
    # Intentar convertir usando LibreOffice si está disponible
    try:
        subprocess.run([
            "libreoffice",
            "--headless",
            "--convert-to",
            "pdf",
            str(p)
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        output_pdf = p.with_suffix('.pdf')
        if output_pdf.exists():
            print(f"Converted to {output_pdf}")
        else:
            print("Conversión falló: PDF no generado", file=sys.stderr)
            sys.exit(1)
    except FileNotFoundError:
        print("LibreOffice no está instalado. No se pudo convertir.", file=sys.stderr)
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"Error al convertir el archivo: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: convert_to_pdf.py <archivo_entrada>", file=sys.stderr)
        sys.exit(1)
    convert(sys.argv[1])
