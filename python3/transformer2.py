import pdfplumber
import fitz  # PyMuPDF

def add_cropbox_if_missing(pdf_path, output_path):
	doc = fitz.open(pdf_path)

	for page in doc:
		mediabox = page.rect
		cropbox = page.cropbox
		
		if cropbox == mediabox:
			# Réduire manuellement les bords (par exemple 10 pts de chaque côté)
			new_cropbox = fitz.Rect(
				mediabox.x0 + 10,
				mediabox.y0 + 10,
				mediabox.x1 - 10,
				mediabox.y1 - 10
			)
			page.set_cropbox(new_cropbox)

	doc.save(output_path)
	print(f"PDF corrigé : {output_path}")

# Utilisation
add_cropbox_if_missing("PV CREDITFLOW (3).pdf", "final.pdf")


with pdfplumber.open("final.pdf") as pdf:
	for page in pdf.pages:
		page_text = page.extract_text()
		print("start page---------------------------------------------------------------------------------------\n\n\n\n\n\n\n")
		lines = page_text.split("\n")
		print(lines)
		print("\n\n\n\n\n\n\nend page---------------------------------------------------------------------------------------")
		exit()