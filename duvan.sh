#!/bin/bash
# Script de arranque rápido para Proyecto Duvan
# Uso: ./duvan.sh [puerto]

set -e

# Detectar si estamos en Termux o Proot-Distro
if command -v pkg &>/dev/null; then
    echo "📱 Termux detectado"
    pkg update -y
    pkg install -y nodejs git
    if ! command -v libreoffice &>/dev/null; then
        echo "⚠️  LibreOffice no disponible en Termux puro."
        echo "   Se recomienda usar Proot-Distro para la conversión a PDF."
        echo "   ¿Instalar Proot-Distro? (s/N)"
        read -r REPLY
        if [[ "$REPLY" =~ ^[Ss]$ ]]; then
            pkg install -y proot-distro
            proot-distro install ubuntu
            proot-distro login ubuntu
        fi
    fi
elif command -v apt &>/dev/null; then
    echo "🐧 Ubuntu/Debian detectado"
    apt update -y
    apt install -y nodejs npm libreoffice
fi

# Instalar dependencias del proyecto
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Arrancar servidor
PORT="${1:-3000}"
echo "🚀 Iniciando Duvan en http://localhost:${PORT}"
PORT=$PORT node server.js
