import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('java', java);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

export function highlightCode(code: string, className?: string) {
  const requested = className?.match(/\blanguage-([^\s]+)/)?.[1];
  const language = requested === 'shell' ? 'bash' : requested;
  if (!language || !hljs.getLanguage(language)) return undefined;
  return hljs.highlight(code, { language }).value;
}
