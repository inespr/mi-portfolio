# Inés Pernil — Portfolio

Portfolio personal desarrollado con **React 19**, **TypeScript** y **Tailwind CSS**. Diseño moderno con animaciones fluidas, soporte multiidioma (6 idiomas) y modo claro/oscuro.

🌐 **[Ver en vivo →](#)**

---

## Capturas de pantalla

### Hero
| Desktop | Móvil |
|---|---|
| ![Hero desktop](./screenshots/hero-desktop.png) | ![Hero móvil](./screenshots/hero-mobile.png) |

### Experiencia y Skills
| Experiencia | Sobre mí & Skills |
|---|---|
| ![Experiencia](./screenshots/experience.png) | ![Skills](./screenshots/about-skills.png) |

### Proyectos y Contacto
| Proyectos | Contacto |
|---|---|
| ![Proyectos](./screenshots/projects.png) | ![Contacto](./screenshots/contact.png) |

---

## Características

- **Typewriter effect** en el título — animación letra a letra al cargar la página
- **Floating pill nav** — navegación flotante centrada en la parte inferior, con indicador deslizante animado que detecta la sección activa al hacer scroll
- **Timeline de experiencia** — línea vertical con puntos de colores para cada posición
- **Skills como badges** — etiquetas de colores agrupadas por categoría
- **Tarjetas de proyectos** — repos de GitHub cargados en tiempo real con lenguaje y estrellas
- **Fondo con blobs animados** — gradientes suaves que flotan en el fondo
- **Barra de progreso de scroll** — línea degradada en la parte superior
- **Modo claro/oscuro** — cambia con un botón en la navbar
- **6 idiomas** — Español, English, Français, Deutsch, Italiano, Português
- **Cursor personalizado** — efecto al pasar por elementos interactivos
- **Diseño responsive** — adaptado para móvil, tablet y escritorio
- **Animaciones con Framer Motion** — entradas suaves, spring animations

---

## Stack tecnológico

| Tecnología | Versión | Para qué se usa |
|---|---|---|
| [React](https://react.dev/) | 19 | Framework principal |
| [TypeScript](https://www.typescriptlang.org/) | 5.3 | Tipado estático |
| [Vite](https://vitejs.dev/) | 5 | Bundler y dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Estilos utility-first |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animaciones |
| [i18next](https://www.i18next.com/) | 25 | Internacionalización |
| [React Icons](https://react-icons.github.io/react-icons/) | 5 | Iconos |

---

## Cómo ejecutarlo en local

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/inespr/mi-portfolio.git
cd mi-portfolio

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

### Otros comandos

```bash
npm run build      # Build de producción
npm run preview    # Vista previa del build
npm run lint       # Linter
```

---

## Estructura del proyecto

```
mi-portfolio/
├── public/
│   └── locales/           # Traducciones (es, en, fr, de, it, pt)
│       ├── es/translation.json
│       ├── en/translation.json
│       └── ...
├── src/
│   ├── assets/            # Imágenes y CV PDF
│   ├── components/
│   │   ├── CustomCursor.tsx    # Cursor personalizado
│   │   ├── FloatingNav.tsx     # Navegación flotante pill
│   │   ├── CoinFlipImage.tsx   # Foto de perfil interactiva
│   │   └── Logo.tsx
│   ├── context/
│   │   └── ThemeContext.tsx    # Contexto dark/light mode
│   ├── App.tsx            # Componente principal con todas las secciones
│   ├── i18n.ts            # Configuración de i18next
│   └── index.css          # Estilos globales y animaciones CSS
├── screenshots/           # Capturas de pantalla para el README
└── README.md
```

---

## Secciones de la web

### Hero
Presentación principal con efecto typewriter en el título. Incluye botones de contacto, proyectos y descarga de CV, además de un indicador de scroll animado.

### Experiencia
Timeline vertical con las tres posiciones profesionales, cada una con un punto de color diferente, badge del tipo de contrato y descripción completa.

### Sobre mí
Texto de presentación con foto de perfil interactiva (se puede arrastrar para girarla). Incluye idiomas con badges. Debajo, las habilidades técnicas organizadas en 4 grupos: Mobile, Web, Backend & Data y Herramientas.

### Proyectos
Grid de tarjetas generado automáticamente desde la API de GitHub. Muestra nombre, descripción, lenguaje de programación con su color oficial y número de estrellas.

### Contacto
Sección final con email, teléfono y links a GitHub y LinkedIn.

---

## Personalización

Para adaptar este portfolio a otro desarrollador:

1. **Datos personales** → edita `public/locales/es/translation.json` (y los demás idiomas)
2. **Foto** → reemplaza `src/assets/profile.jpg`
3. **CV** → reemplaza `src/assets/CV Ines ES.pdf`
4. **Colores** → modifica las variables en `tailwind.config.js`
5. **GitHub repos** → cambia `inespr` por tu usuario en `src/App.tsx`

---

## Autor

**Inés Pernil Romero** — React Native Developer · Málaga, España

[![GitHub](https://img.shields.io/badge/GitHub-inespr-black?style=flat&logo=github)](https://github.com/inespr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Inés_Pernil-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/ines-pernil-romero-a08749143/)
[![Email](https://img.shields.io/badge/Email-inespromero@gmail.com-orange?style=flat&logo=gmail)](mailto:inespromero@gmail.com)
