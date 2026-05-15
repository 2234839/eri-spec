/**
 * Lightweight markdown-to-HTML renderer for ERI docs.
 * Covers: headings, bold, italic, code blocks, inline code, tables,
 * lists, links, blockquotes, horizontal rules, images.
 */
const md = (() => {
  /** Escape HTML entities */
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /** Render inline formatting */
  const inline = (s) =>
    s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
     .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
     .replace(/`([^`]+)`/g, '<code>$1</code>')
     .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
     .replace(/\*(.+?)\*/g, '<em>$1</em>');

  /** Render table block */
  const table = (lines) => {
    if (lines.length < 2) return lines.map(l => `<p>${inline(l)}</p>`).join('');
    const head = lines[0].split('|').map(c => c.trim()).filter(Boolean);
    const body = lines.slice(2).map(row => row.split('|').map(c => c.trim()).filter(Boolean));
    let h = '<table><thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
    for (const row of body) h += '<tr>' + row.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>';
    return h + '</tbody></table>';
  };

  /** Main parse function */
  const parse = (src) => {
    const lines = src.split('\n');
    const out = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      /** fenced code block */
      if (line.startsWith('```')) {
        const lang = line.slice(3).trim();
        const buf = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) { buf.push(esc(lines[i])); i++; }
        out.push(`<pre><code${lang ? ` class="language-${lang}"` : ''}>${buf.join('\n')}</code></pre>`);
        i++; continue;
      }

      /** headings */
      const hm = line.match(/^(#{1,6})\s+(.+)/);
      if (hm) { out.push(`<h${hm[1].length}>${inline(hm[2])}</h${hm[1].length}>`); i++; continue; }

      /** horizontal rule */
      if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue; }

      /** blockquote */
      if (line.startsWith('> ')) {
        const buf = [];
        while (i < lines.length && lines[i].startsWith('> ')) { buf.push(lines[i].slice(2)); i++; }
        out.push(`<blockquote>${parse(buf.join('\n'))}</blockquote>`);
        continue;
      }

      /** table */
      if (line.includes('|') && i + 1 < lines.length && /^\|?\s*[-:]+/.test(lines[i + 1])) {
        const buf = [];
        while (i < lines.length && lines[i].includes('|')) { buf.push(lines[i]); i++; }
        out.push(table(buf));
        continue;
      }

      /** unordered list */
      if (/^[-*]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(`<li>${inline(lines[i].replace(/^[-*]\s+/, ''))}</li>`); i++; }
        out.push(`<ul>${items.join('')}</ul>`);
        continue;
      }

      /** ordered list */
      if (/^\d+\.\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(`<li>${inline(lines[i].replace(/^\d+\.\s+/, ''))}</li>`); i++; }
        out.push(`<ol>${items.join('')}</ol>`);
        continue;
      }

      /** blank line */
      if (!line.trim()) { i++; continue; }

      /** paragraph */
      out.push(`<p>${inline(line)}</p>`);
      i++;
    }

    return out.join('\n');
  };

  return { parse };
})();
