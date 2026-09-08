import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class SiteTest(unittest.TestCase):
    def test_root_gateway_contract(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        css = (ROOT / "assets/neonwulf.css").read_text(encoding="utf-8")
        js = (ROOT / "assets/site.mjs").read_text(encoding="utf-8")
        self.assertIn('href="/repo/"', html)
        self.assertIn('https://github.com/Fritz-Wulf/fw', html)
        self.assertIn('id="package-count"', html)
        self.assertIn('id="fw-version"', html)
        self.assertIn('/repo/index.json', js)
        self.assertIn('prefers-reduced-motion', css)
        self.assertIn('focus-visible', css)

if __name__ == "__main__":
    unittest.main()
