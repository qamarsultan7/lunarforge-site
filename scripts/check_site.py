"""Validate local assets, anchors, and gallery controls before deployment."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
ROOT = Path(__file__).resolve().parents[1] / 'dist'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.errors = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                self.errors.append('Duplicate id: ' + attrs['id'])
            self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            if attrs.get(key):
                self.references.append(attrs[key])
        self.references.extend('#' + item for item in attrs.get('aria-controls', '').split())
page = Page()
page.feed((ROOT / 'index.html').read_text(encoding='utf-8-sig'))
for reference in page.references:
    url = urlsplit(reference)
    if url.scheme or url.netloc:
        continue
    if url.path:
        target = (ROOT / unquote(url.path)).resolve()
        if not target.is_relative_to(ROOT.resolve()) or not target.is_file():
            page.errors.append('Missing local asset: ' + reference)
    elif url.fragment and unquote(url.fragment) not in page.ids:
        page.errors.append('Missing anchor or control target: ' + reference)
if page.errors:
    raise SystemExit('\n'.join(page.errors))
print(f'Site checks passed: {len(page.references)} references checked.')
