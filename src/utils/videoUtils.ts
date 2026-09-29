/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Extrai o identificador (ID) de 11 caracteres de qualquer URL do YouTube,
 * suportando os formatos watch?v=, youtu.be/, embed/, v/, shorts/ ou ID direto.
 */
export function extractYouTubeVideoId(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const clean = url.trim();

  // Caso seja já o ID puro de 11 caracteres alfanuméricos
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  // Padrões canónicos do YouTube:
  // - https://www.youtube.com/watch?v=XXXXX
  // - https://youtu.be/XXXXX
  // - https://www.youtube.com/embed/XXXXX
  // - https://www.youtube.com/shorts/XXXXX
  // - https://www.youtube.com/v/XXXXX
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
  ];

  for (const regex of patterns) {
    const match = clean.match(regex);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }

  return null;
}

/**
 * Validação automática de vídeo antes de sintonizar via noembed.com
 * Verifica gratuitamente se o vídeo existe, é público e permite incorporação.
 */
export async function validateYouTubeVideo(videoId: string): Promise<{ isValid: boolean; title?: string }> {
  if (!videoId || videoId.length !== 11) {
    return { isValid: false };
  }

  try {
    const target = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(target, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) {
      return { isValid: false };
    }

    const data = await res.json();
    if (data && data.title && !data.error) {
      return { isValid: true, title: data.title };
    }

    return { isValid: false };
  } catch (err) {
    console.warn('Verificação NoEmbed inconclusiva ou timeout. A considerar sinal indisponível:', err);
    return { isValid: false };
  }
}

/**
 * Converte qualquer link do YouTube para o URL de incorporação seguro via youtube-nocookie,
 * com playsinline, sem vídeos relacionados externos e branding modesto.
 */
export function getYouTubeEmbedUrl(url?: string): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

/**
 * Retorna o link direto no YouTube para abertura externa ou pesquisa
 */
export function getYouTubeWatchUrl(url?: string, recipeTitle?: string): string {
  const videoId = extractYouTubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  const query = encodeURIComponent(`receita ${recipeTitle || ''}`.trim());
  return `https://www.youtube.com/results?search_query=${query}`;
}
