import re
import argparse
import pdfplumber
from pathlib import Path
from openpyxl import Workbook

# === CONFIGURATION ===
PDF_PATH = "PV CREDITFLOW (3).pdf"
OUTPUT_XLSX = "donnees_extraites_robuste.xlsx"

# === LIBELLÉS À DÉTECTER ===
LABELS = {
	"Numéro de PV": ["procès", "verbal"],
	"Emprunteur": ["emprunteur"],
	"CAF": ["caf"],
	"Nature juridique": ["nature", "juridique"],
	"N° de Compte / Matricule": ["compte", "matricule"],
	"Activité principale": ["activité", "principale"],
	"Objet du financement": ["objet du", "financement"],
	"Type de concours sollicité": ["type", "concours"],
	"Montant sollicité": ["montant", "sollicité"],
	"Montant proposé par le CAF": ["montant", "proposé", "caf"],
	"Durée proposée (ARC)": ["durée", "approuvée"],
	"Chiffre d'affaires mensuel": ["chiffre", "affaires", "mensuel"],
	"Marge totale": ["marge", "totale"],
	"Capacité dégagée": ["capacité", "dégagée"],
	"TMC": ["tmc", "confié"]
}

# === OUTILS ===

def extract_text_lines(pdf_path):
	"""Lit le PDF et retourne une liste de lignes de texte propres"""
	with pdfplumber.open(pdf_path) as pdf:
		lines = []
		for page in pdf.pages:
			text = page.extract_text()
			if text:
				lines.extend(text.splitlines())
	return [re.sub(r"\s+", " ", line.strip()) for line in lines if line.strip()]

def clean(text):
	return re.sub(r'\s+', ' ', text).strip()

def contains_all_keywords(text, keywords):
	return all(k.lower() in text.lower() for k in keywords)

def smart_extract_value(group_text, keywords):
	"""
	Essaie d'extraire une valeur proche des mots-clés, que ce soit avant, après ou entre.
	"""
	words = group_text.split()
	lower_words = [w.lower() for w in words]

	# Chercher les indices des mots-clés dans le texte
	indices = [i for i, word in enumerate(lower_words) if word in keywords]
	if len(indices) < len(keywords):
		return None

	# Si une valeur est intercalée entre les mots du label
	if len(indices) >= 2:
		first = indices[0]
		last = indices[-1]
		between = words[first+1:last]
		if between:
			return clean(" ".join(between))

	# Sinon, tenter de prendre ce qui suit le dernier mot du label
	last_idx = indices[-1]
	after = words[last_idx+1:last_idx+6]
	if after:
		return clean(" ".join(after))

	return None

def scan_with_window(lines, label_keywords, window_size=3):
	"""
	Balaye le texte par fenêtres et détecte les blocs qui contiennent les mots-clés.
	"""
	for i in range(len(lines) - window_size + 1):
		group = " ".join(lines[i:i+window_size])
		if contains_all_keywords(group, label_keywords):
			value = smart_extract_value(group, label_keywords)
			if value:
				return value
	return None

def extract_all_labels(lines, label_map):
	results = {}
	for label_name, keywords in label_map.items():
		value = scan_with_window(lines, keywords)
		results[label_name] = value
	return results

def write_to_excel(data, output_path):
	wb = Workbook()
	ws = wb.active
	ws.title = "Extraits PDF"
	for idx, (key, value) in enumerate(data.items(), start=1):
		ws.cell(row=idx, column=1, value=key)
		ws.cell(row=idx, column=2, value=value)
	wb.save(output_path)

# # === EXÉCUTION ===

# print("🔍 Lecture du PDF...")
# lines = extract_text_lines(PDF_PATH)

# print("📊 Extraction intelligente des libellés + valeurs...")
# extracted_data = extract_all_labels(lines, LABELS)

# print("💾 Écriture du résultat dans Excel...")
# write_to_excel(extracted_data, OUTPUT_XLSX)

# print(f"✅ Terminé. Données enregistrées dans : {OUTPUT_XLSX}")

# === SCRIPT PRINCIPAL ===
def main():
	parser = argparse.ArgumentParser(description="Extraction intelligente des données d'un PDF vers Excel.")
	parser.add_argument("pdf_path", type=str, help="Chemin du fichier PDF à traiter.")
	args = parser.parse_args()

	pdf_file = Path(args.pdf_path)
	if not pdf_file.exists() or pdf_file.suffix.lower() != ".pdf":
		print("❌ Fichier PDF non valide.")
		return

	print(f"🔍 Lecture de : {pdf_file.name}")
	lines = extract_text_lines(str(pdf_file))

	print("📊 Extraction des données...")
	extracted_data = extract_all_labels(lines, LABELS)

	excel_name = pdf_file.stem + "_extrait.xlsx"
	output_path = pdf_file.parent / excel_name

	print(f"💾 Enregistrement dans : {excel_name}")
	write_to_excel(extracted_data, str(output_path))

	print("✅ Terminé !")

if __name__ == "__main__":
	main()