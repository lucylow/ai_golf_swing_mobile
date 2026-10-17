from pathlib import Path
src = list(Path('/mnt/data/v16-mobile-biomechanics/src').glob('*.ts'))
print('V16 source modules:', len(src))
print('V16 source lines:', sum(len(p.read_text().splitlines()) for p in src))
