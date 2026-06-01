import fitz  # alias pour pymupdf

with fitz.open("PV CREDITFLOW (3).pdf") as doc:
    text = ""
    for page in doc:
        print(
            "\n\n\n\n\n-----------------------------------------------------dums-----------------------------------------------------\n\n\n\n\n"
        )
        text += page.get_text()

print(text)
