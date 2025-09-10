#!/bin/bash

# 🚀 SCRIPT DE DESPLIEGUE - EMPATHIC ACTIONS FRONTEND
# Este script automatiza el proceso de build del frontend

echo "🌐 Iniciando build de Empathic Actions Frontend..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "Este script debe ejecutarse desde el directorio raíz del proyecto Next.js"
    exit 1
fi

# Verificar si existe .env.production
if [ ! -f ".env.production" ]; then
    print_error "No se encontró .env.production. Por favor crea este archivo con las variables necesarias."
    exit 1
fi

print_info "Verificando configuración..."
if grep -q "your-api-domain.com" .env.production; then
    print_error "⚠️  IMPORTANTE: Debes actualizar .env.production con la URL real de tu API"
    print_info "Edita .env.production y reemplaza 'your-api-domain.com' con tu URL real"
    exit 1
fi

print_warning "PASO 1: Limpiando build anterior..."
rm -rf .next
rm -rf out
print_success "Build anterior limpiado"

print_warning "PASO 2: Instalando dependencias..."
npm install
if [ $? -eq 0 ]; then
    print_success "Dependencias instaladas correctamente"
else
    print_error "Error al instalar dependencias"
    exit 1
fi

print_warning "PASO 3: Copiando variables de entorno de producción..."
cp .env.production .env.local
print_success "Variables de entorno configuradas"

print_warning "PASO 4: Ejecutando build de producción..."
npm run build
if [ $? -eq 0 ]; then
    print_success "Build completado exitosamente"
else
    print_error "Error durante el build"
    exit 1
fi

echo ""
print_success "🎉 BUILD COMPLETADO EXITOSAMENTE!"
echo ""
print_info "📋 Próximos pasos:"
echo "   1. Subir los archivos de la carpeta '.next' a tu servidor"
echo "   2. O usar 'npm start' para servidor Node.js"
echo "   3. O desplegar en Vercel/Netlify"
echo ""
print_info "🔧 Variables de entorno configuradas:"
cat .env.local
echo ""